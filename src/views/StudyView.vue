<template>
  <div class="wrapper">
    <div class="navbar">
      <el-progress
        :percentage="0"
        status="success"
        style="margin-bottom: 20px"
      ></el-progress>

      <el-tree
        :data="this.course.lessons"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div
      class="content"
      v-if="currentLessonLabel.length != 0 && !lessonLoading"
    >
      <a>{{ currentLessonLabel }}</a>
      <el-divider style="margin: 5px"></el-divider>

      <StudyRender
        :render="currentLesson[active]"
        style="margin-bottom: 20px"
      ></StudyRender>

      <div v-if="lessonEnd">
        <h1>Вы завершили урок! 🎆</h1>
      </div>

      <el-steps :active="active" finish-status="success">
        <el-step v-for="n in currentLesson.length" :key="n"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px" @click="back">Назад</el-button>
      <el-button type="success" style="margin-top: 12px" @click="next">{{
        lessonEnd ? "Завершить урок" : "Далее"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { fetchUserCourse } from "@/api/api";
import StudyRender from "@/components/StudyRender.vue";

export default {
  components: { StudyRender },
  data() {
    return {
      course: {},
      active: 0, //current step
      defaultProps: {
        children: "children",
        label: "label",
      },
      currentLessonLabel: "",
      currentLesson: {},
      lessonLoading: false,
    };
  },
  computed: {
    lessonEnd() {
      return this.active == this.currentLesson.length;
    },
  },
  methods: {
    next() {
      if (this.lessonEnd) {
        console.log("sdf");
      } else if (this.active++ > this.currentLesson.length)
        this.active = this.currentLesson.length;
    },
    back() {
      if (this.active-- <= 0) this.active = 0;
    },
    handleNodeClick(t) {
      if ("id" in t) {
        this.currentLessonLabel = t.label;
        this.currentLesson = t.content;
      }
    },
  },
  async mounted() {
    this.course = await fetchUserCourse(this.$route.params.id);
  },
};
</script>

<style scoped>
.wrapper {
  padding-top: 100px;
  width: 90%;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
}
.navbar {
  width: 200px;
}
.content {
  width: 100%;
  padding: 20px;
  flex-direction: column;
  align-items: left;
  text-align: left;
}
</style>
