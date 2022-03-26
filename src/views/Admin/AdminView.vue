<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" @tab-click="handleClick" :key="activeName">
      <el-tab-pane label="Курсы" name="Courses" :lasy="true">
        <CoursesView v-on:goto="navpush"></CoursesView>
      </el-tab-pane>
      <el-tab-pane label="Создать курс" name="CreateCourse" :lasy="true">
        <CreateCourse
          v-model:args="args"
          v-on:clearArgs="args = null"
        ></CreateCourse>
      </el-tab-pane>
      <el-tab-pane label="Пользователи" name="Users" :lasy="true"
        ><UsersView></UsersView
      ></el-tab-pane>
      <el-tab-pane label="Аналитика" name="Analytics" :lasy="true"
        >CreateCourse
      </el-tab-pane>
      <el-tab-pane
        label="Добавить категорию"
        name="CreateCategory"
        :lasy="true"
      >
        <CreateCategory></CreateCategory>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateCourse from "./CreateCourse.vue";
import UsersView from "./UsersView.vue";
import CreateCategory from "./CreateCategory.vue";
import CoursesView from "./CoursesView.vue";
export default {
  components: { CreateCourse, UsersView, CreateCategory, CoursesView },
  data() {
    return {
      activeName: "Courses",
      args: null,
    };
  },
  methods: {
    navpush(name, args) {
      this.activeName = name;
      this.args = args;
    },
  },
  watch: {
    activeName() {},
  },
};
</script>

<style scoped>
.wrapper {
  width: 80%;
  margin: 0px auto;
  padding-top: 100px;
}
.el-menu-vertical {
  width: 300px;
}
</style>
