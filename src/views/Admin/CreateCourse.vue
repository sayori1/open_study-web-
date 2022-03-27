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
        v-model="metadata[current - 1]['heading']"
        placeholder="Название главы"
        style="width: 300px; margin-left: 10px"
      ></el-input>
      <el-input
        v-model="metadata[current - 1]['name']"
        placeholder="Название урока"
        style="width: 300px; margin-left: 10px"
      ></el-input>
    </div>

    <div style="display: flex; flex-direction: row; margin-top: 10px">
      <el-button @click="addCode('Heading')">Heading</el-button>
      <el-button @click="addCode('Body')">Body</el-button>
      <el-button @click="addCode('Quiz')">Quiz</el-button>
      <el-button @click="addCode('Memento')">Memento</el-button>
      <el-button @click="addCode('Visum')">Visum</el-button>
      <el-button @click="addCode('New page')">New page</el-button>
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
      metadata: [{}, {}],
      data: [],
      status: "",
      id: null,

      category: "",
    };
  },
  watch: {
    current(v) {
      this.content[v - 1] += "";
      if (v > this.count) {
        this.count += 1;
        this.content.push("");
        this.metadata.push({});
      }
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
        return null;
      }
      this.status = "Успешно отпарсено";
      return this.formTree();
    },
    formTree() {
      let tree = [];

      let findHeading = (heading) => {
        for (let t in tree) if (tree[t].label == heading) return t;
        return -1;
      };

      for (let i in this.metadata) {
        const headingInTree = findHeading(this.metadata[i].heading);
        if (headingInTree != -1) {
          tree[headingInTree].children.push({
            label: this.metadata[i].name,
            id: i,
            content: this.data[i],
          });
        } else {
          tree.push({
            label: this.metadata[i].heading,
            children: [
              {
                id: i,
                label: this.metadata[i].heading,
                content: this.data[i],
              },
            ],
          });
        }
      }
      return tree;
    },

    addCode(t) {
      if (t == "Heading") {
        this.content[this.current - 1] += `{
  "type": "Heading",
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
      } else if (t == "New page") {
        this.content[this.current - 1] += `[],
`;
      }
    },

    async createCourse() {
      let tree = this.parseAndSave();
      if (tree == null) return;
      const result = await axios.post(baseURL + "/rest/course", {
        name: this.courseName,
        shortDescription: this.shortCourseDescription,
        description: this.courseDescription,
        lessons: tree,
        contentRaw: this.content,
        metadataRaw: this.metadata,
        category: this.category,
      });

      if (result.status == 200) {
        this.$message({
          showClose: true,
          message: "Congrats, you created a course",
          type: "success",
        });
        console.log(result);
        this.id = result.data.id;
      } else {
        this.$message({
          showClose: true,
          message: "Unexpected error happened",
          type: "error",
        });
      }
    },
    async saveCourse() {
      let tree = this.parseAndSave();
      if (tree == null) return;
      const result = await axios.put(baseURL + "/rest/course", {
        _id: this.id,
        name: this.courseName,
        shortDescription: this.shortCourseDescription,
        description: this.courseDescription,
        lessons: tree,
        contentRaw: this.content,
        metadataRaw: this.metadata,
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
        this.content = course.data.contentRaw;
        this.metadata = course.data.metadataRaw;
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
