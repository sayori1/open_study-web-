<template>
  <el-table :data="courses" style="width: 800px; margin: 0px auto">
    <el-table-column fixed prop="name" label="Name" width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="shortDescription"
      label="Short Description"
      width="150"
    >
    </el-table-column>
    <el-table-column fixed prop="description" label="Description" width="150">
    </el-table-column>
    <el-table-column label="Operations" width="300">
      <template v-slot="scope">
        <el-row>
          <el-button @click="deleteCourse(scope.$index)">Удалить</el-button>
          <el-button @click="editCourse(scope.$index)">Изменить</el-button>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { baseURL, _fetchCourses } from "@/api/api";
import axios from "axios";

export default {
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    async deleteCourse(index) {
      this.$alert(
        `Are you sure you want to delete the ${index}th course?`,
        "Attention",
        {
          confirmButtonText: "Yes",
          callback: async () => {
            const response = await axios.delete(
              baseURL + `/rest/course?_id=${this.courses[index]._id}`
            );
            if (response.status == 200) {
              this.$message({
                type: "success",
                message: `Удалено!`,
              });
              this.refresh();
            } else
              this.$message({
                type: "error",
                message: `Ошибка`,
              });
          },
        }
      );
    },
    editCourse(index) {
      this.$emit("goto", "CreateCourse", {
        type: "edit",
        id: this.courses[index]._id,
      });
    },
    async refresh() {
      var response = await _fetchCourses();
      if (response.status == 200) this.courses = response.data;
    },
  },
  async mounted() {
    await this.refresh();
  },
};
</script>
<style>
el-table {
  align-items: left;
  justify-content: columns;
}
</style>
