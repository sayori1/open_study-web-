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
    <div class="content" v-if="currentLesson.id && !lessonLoading">
      <a>{{ currentLesson.label }}</a>
      <el-divider style="margin: 5px"></el-divider>

      <StudyRender
        :render="currentLesson.content[active]"
        style="margin-bottom: 20px"
      ></StudyRender>

      <div v-if="lessonEnd">
        <h1>Вы завершили урок! 🎆</h1>
      </div>

      <el-steps :active="active" finish-status="success">
        <el-step v-for="n in currentLesson.content.length" :key="n"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px" @click="back">Назад</el-button>
      <el-button type="success" style="margin-top: 12px" @click="next">{{
        lessonEnd ? "Завершить урок" : "Далее"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { baseURL, fetchUserCourse } from "@/api/api";
import StudyRender from "@/components/StudyRender.vue";
import axios from "axios";

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
      currentLesson: {
        content: [],
        label: "",
        id: null,
      },
      lessonLoading: false,
    };
  },
  computed: {
    lessonEnd() {
      return this.active == this.currentLesson.content.length;
    },
  },
  methods: {
    next() {
      if (this.lessonEnd) {
        this.lessonComplete();
      } else if (this.active++ > this.currentLesson.content.length)
        this.active = this.currentLesson.content.length;
    },
    back() {
      if (this.active-- <= 0) this.active = 0;
    },
    handleNodeClick(t) {
      if ("id" in t) this.currentLesson = t;
    },
    async lessonComplete() {
      console.log(this.isLessonCompleted(this.currentLesson.id));
      if (this.isLessonCompleted(this.currentLesson.id)) {
        this.$message({
          title: "",
          message: "Вы уже завершили урок",
          duration: 1500,
          type: "info",
        });
        return;
      }

      const result = await axios.post(baseURL + "/me/lessonComplete", {
        courseId: this.course._id,
        login: this.$store.state.auth.user.login,
        token: this.$store.state.auth.token,
        lessonId: this.currentLesson.id,
      });
      console.log(result);
      if (result.status == 200)
        this.$store.dispatch("auth/setData", { user: result.data });
    },
    isLessonCompleted(id) {
      let _course = this.getUserCourse();
      return _course.completedLessons.filter((item) => item == id).length != 0;
    },
    getUserCourse() {
      let _course = this.$store.state.auth.user.userCourses.filter((item) => {
        return item.courseId == this.course._id;
      })[0];
      return _course;
    },
    getFollowingLesson() {
      for (var i = 0; i < this.course.lessons.length; i += 1) {
        for (var l = 0; l < this.course.lessons[l].children.length; l += 1) {
          let isCompleted = this.isLessonCompleted(
            Number.parseInt(this.course.lessons[i].children[l].id)
          );
          console.log(isCompleted);
          if (isCompleted) continue;
          return this.course.lessons[i].children[l];
        }
      }
      return null;
    },
    courseEnd() {
      console.log("course end");
    },
  },
  async mounted() {
    this.course = await fetchUserCourse(this.$route.params.id);
    let lesson = this.getFollowingLesson();
    if (lesson == null) this.courseEnd();
    else {
      this.currentLesson = lesson;
    }
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
