<template>
  <div class="wrapper">
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      "
    >
      <h1>{{ course.name }}</h1>
      <el-rate
        v-bind:modelValue="course.rating"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} оценка"
        style="margin-bottom: 5px"
      >
      </el-rate>
    </div>

    <el-divider></el-divider>
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      "
    >
      <div>
        <h3>Об этом курсе:</h3>
        <a>{{ course.description }}</a>
      </div>
      <el-button type="success" @click="enroll">
        {{ course.enrolled ? "Учиться" : "Записаться" }}</el-button
      >
    </div>

    <h3>Контент курса:</h3>
    <el-tree
      :data="course.lessons"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>

    <div style="margin-top: 10px"></div>
    <el-card style="border-radius: 10px">
      <a>Авторы:</a>
      <ul>
        <li v-for="author in course.authors" :key="author">{{ author }}</li>
      </ul>
      <a>В числах:</a>
      <ul>
        <li>Участников: {{ course.participants }}</li>
        <li>Кол-во часов: {{ course.time }}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { enrollCourse, fetchCourse } from "@/api/api";

export default {
  components: {},
  data() {
    return {
      course: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  async mounted() {
    this.course = await fetchCourse(this.$route.params.id);
  },
  methods: {
    async enroll() {
      const result = await enrollCourse(
        this.course._id,
        this.$store.state.auth.user.login,
        this.$store.state.auth.token
      );
      
      if (result.status == 200) {
        await this.$store.dispatch("auth/refresh");
        this.$notify({
          title: "Успех!",
          message: "Вы успешно записались на курс!",
          duration: 2000,
          type: "success",
        });
        this.$router.push("/study/" + this.course._id);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding-top: 100px;
  width: 70%;
  margin: 0px auto;
  text-align: left;
}
</style>
