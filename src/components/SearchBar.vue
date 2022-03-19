<template>
  <div style="display: flex; margin-bottom: 20px">
    <el-input placeholder="Название курса" v-model="find"></el-input>
    <el-button style="margin-left: 5px"> Искать</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      find: "",
    };
  },
};
</script>
<style></style>
