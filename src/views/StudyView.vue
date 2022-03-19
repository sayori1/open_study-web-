<template>
  <div class="wrapper">
    <div class="navbar">
      <el-progress
        :percentage="0"
        status="success"
        style="margin-bottom: 20px"
      ></el-progress>

      <el-tree
        :data="this.course.content"
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
        :render="currentLesson.pages[active]"
        style="margin-bottom: 20px"
      ></StudyRender>

      <el-steps :active="active" finish-status="success">
        <el-step
          v-for="n in currentLesson.pages.length"
          :key="n"
          :title="n"
        ></el-step>
      </el-steps>
      <el-button style="margin-top: 12px" @click="back">Назад</el-button>
      <el-button type="success" style="margin-top: 12px" @click="next"
        >Далее</el-button
      >
    </div>
  </div>
</template>

<script>
import { fetchLesson, fetchUserCourse } from "@/api/api";
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
  methods: {
    next() {
      if (this.active++ > 2) this.active = 2;
    },
    back() {
      if (this.active-- <= 0) this.active = 0;
    },
    async handleNodeClick(t) {
      if ("id" in t) {
        this.currentLessonLabel = t.label;
        await this.loadLesson(t.id);
      }
    },
    async loadLesson(id) {
      this.lessonLoading = true;
      this.currentLesson = await fetchLesson(id);
      this.lessonLoading = false;
    },
  },
  async mounted() {
    this.course = await fetchUserCourse(0);
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 100px;
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
}
</style>
