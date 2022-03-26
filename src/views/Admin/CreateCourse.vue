<template>
  <div>
    <el-input v-model="courseName" placeholder="Название курса" />
    <el-input
      v-model="category"
      placeholder="Категория"
      style="margin-top: 10px"
    >
    </el-input>

    <el-input
      type="textarea"
      placeholder="Описание курса"
      v-model="courseDescription"
      style="margin-top: 10px"
    />
    <el-input
      type="textarea"
      placeholder="Краткое описание курса"
      v-model="shortCourseDescription"
      style="margin-top: 10px"
    />

    <div style="display: flex; flex-direction: row; margin-top: 10px">
      <el-input-number
        v-model="current"
        @change="handleChange"
        :min="1"
      ></el-input-number>
      <el-input
        v-model="lessonName"
        placeholder="Lesson name"
        style="width: 300px; margin-left: 10px"
      ></el-input>
      <el-input
        v-model="lessonChapter"
        placeholder="Lesson heading"
        style="width: 300px; margin-left: 10px"
      ></el-input>
    </div>

    <div style="display: flex; flex-direction: row; margin-top: 10px">
      <el-button @click="addCode('Title')">Title</el-button>
      <el-button @click="addCode('Body')">Body</el-button>
      <el-button @click="addCode('Quiz')">Quiz</el-button>
      <el-button @click="addCode('Memento')">Memento</el-button>
      <el-button @click="addCode('Visum')">Visum</el-button>
    </div>
    <div style="display: flex; flex-direction: row">
      <v-ace-editor
        v-model:value="content[current - 1]"
        lang="json"
        :options="{ useWorker: true }"
        style="height: 300px; margin-top: 10px; width: 100%"
      />
    </div>

    <el-button
      v-if="!hasArgs"
      @click="createCourse"
      style="margin-bottom: 10px; margin-top: 10px"
      >Создать курс</el-button
    >
    <el-button
      v-if="hasArgs"
      @click="saveCourse"
      style="margin-bottom: 10px; margin-top: 10px"
      >Сохранить курс</el-button
    >
    <a>{{ status }}</a>
  </div>
</template>
<script>
import { VAceEditor } from "vue3-ace-editor";
import ace from "ace-builds";
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@" +
    require("ace-builds").version +
    "/src-noconflict/"
);
import workerJsonUrl from "file-loader?esModule=false!ace-builds/src-noconflict/worker-json.js"; // For webpack / vue-cli
import axios from "axios";
import { baseURL } from "@/api/api";
ace.config.setModuleUrl("ace/mode/json_worker", workerJsonUrl);

export default {
  components: {
    VAceEditor,
  },
  props: {
    args: null,
  },
  computed: {
    hasArgs() {
      return this.id != null;
    },
  },
  data() {
    return {
      courseName: "",
      courseDescription: "",
      shortCourseDescription: "",

      current: 1,
      count: 2,

      categories: ["sdfsad", "sdfsd"],
      showDialog: false,

      content: ["", ""],
      data: [],
      status: "",
      id: null,

      category: "",
    };
  },
  watch: {
    current(v) {
      this.content[v - 1] += "";
    },
  },
  methods: {
    parseAndSave() {
      this.data = [];
      let c = 0;
      try {
        for (var page of this.content) {
          this.data.push(JSON.parse("[" + page + "]"));
          c += 1;
        }
      } catch (e) {
        this.status = c + e;
        return;
      }
      this.status = "Успешно отпарсено";
    },
    addCode(t) {
      if (t == "Title") {
        this.content[this.current - 1] += `{
  "type": "Title",
  "text": ""
},
`;
      } else if (t == "Body") {
        this.content[this.current - 1] += `{
  "type": "Body",
  "text": ""
},
`;
      } else if (t == "Quiz") {
        this.content[this.current - 1] += `{
  "type": "Quiz",
  "question": "",
  "answers": ["1", "2", "3", "4"],
  "correct": 0
},
`;
      } else if (t == "Memento") {
        this.content[this.current - 1] += `{
  "type": "Memento",
  "question": "",
  "answer": ""
},
`;
      } else if (t == "Visum") {
        this.content[this.current - 1] += `{
  "type": "Visum",
  "script": ""
},
`;
      }
    },

    async createCourse() {
      this.parseAndSave();
      const result = await axios.post(baseURL + "/rest/course", {
        name: this.courseName,
        shortDescription: this.shortCourseDescription,
        description: this.courseDescription,
        lessons: this.data,
        lessonsRaw: this.content,
        category: this.category,
      });

      if (result.status == 200) {
        this.$message({
          showClose: true,
          message: "Congrats, you created a course",
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: "Unexpected error happened",
          type: "error",
        });
      }
    },
    async saveCourse() {
      this.parseAndSave();
      const result = await axios.put(baseURL + "/rest/course", {
        _id: this.id,
        name: this.courseName,
        shortDescription: this.shortCourseDescription,
        description: this.courseDescription,
        lessons: this.data,
        lessonsRaw: this.content,
        category: this.category,
      });

      if (result.status == 200) {
        this.$message({
          showClose: true,
          message: "Congrats, course saved!",
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: "Unexpected error happened",
          type: "error",
        });
      }
    },
    async fetchCategories() {
      var response = await axios.get(baseURL + "rest/category");
      console.log(response);
      if (response.status == 200)
        this.categories = response.data.map((item) => item.name);
    },
    async tryToFetchCourse() {
      if (this.args != null) {
        const course = await axios.get(baseURL + "/rest/course", {
          params: {
            _id: this.args.id,
          },
        });

        if (course.status != 200 || course?.data == null) return;

        this.id = this.args.id;
        this.$emit("clearArgs");
        this.courseName = course.data.name;
        this.courseDescription = course.data.description;
        this.shortCourseDescription = course.data.shortDescription;
        this.content = course.data.lessonsRaw;
        this.id = course.data._id;
        this.category = course.data.category;
      }
    },
  },

  async mounted() {
    await this.tryToFetchCourse();
  },
};
</script>
<style scoped></style>
