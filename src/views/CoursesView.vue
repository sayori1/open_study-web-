<template>
  <div class="wrapper">
    <SearchBar></SearchBar>
    <el-tabs @tab-click="tabClick">
      <el-tab-pane v-for="tag in tags" :key="tag" :label="tag">
        <GridComponent>
          <CourseComponent
            v-for="course in courses"
            :key="course._id"
            :course="course"
          ></CourseComponent>
        </GridComponent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchCourses, getFeauturedTags } from "@/api/api";
import CourseComponent from "@/components/CourseComponent.vue";
import GridComponent from "../components/GridComponent.vue";
import SearchBar from "../components/SearchBar.vue";
export default {
  components: { CourseComponent, GridComponent, SearchBar },
  data() {
    return {
      tags: [],
      courses: [],
    };
  },
  methods: {
    async tabClick(v) {
      this.courses = await fetchCourses(this.tags[v.index]);
    },
  },
  async mounted() {
    this.tags = await getFeauturedTags();
    this.courses = await fetchCourses(this.tags[0]);
  },
};
</script>

<style scoped>
.wrapper {
  width: 80%;
  margin: 0px auto;
  padding-top: 100px;
}
</style>
