<template>
  <div>
    <el-input type="text" v-model="category"></el-input>
    <el-button @click="save">Add category</el-button>
  </div>
</template>
<script>
import { baseURL } from "@/api/api";
import axios from "axios";

export default {
  data() {
    return {
      category: "",
    };
  },
  methods: {
    async save() {
      const result = await axios.post(baseURL + "/rest/category", {
        name: this.category,
      });
      console.log(result);
    },
  },
};
</script>
<style></style>
