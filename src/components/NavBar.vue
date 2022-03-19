<template>
  <el-menu
    v-model="activeName"
    mode="horizontal"
    @select="handleSelect"
    style="position: fixed; z-index: 100; width: 100%"
  >
    <img
      src="@/assets/logo.png"
      style="width: 50px; padding: 5px; margin-left: 10px; margin-right: 10px"
    />
    <el-menu-item index="1">Курсы</el-menu-item>
    <el-menu-item index="2">Блог</el-menu-item>
    <el-menu-item index="3">Вход</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeName: "Курсы",
    };
  },
  methods: {
    handleSelect(i) {
      if (i == 1) {
        this.$router.push("/courses");
      }
      if (i == 2) {
        this.$router.push("/blog");
      }
      if (i == 3) {
        this.$router.push("/auth");
      }
    },
  },
};
</script>
<style></style>
