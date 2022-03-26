<template>
  <div class="wrapper">
    <h1>Админ панель</h1>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="2"> Navigator Two </el-menu-item>
      <el-menu-item index="3" disabled> Navigator Three </el-menu-item>
      <el-menu-item index="4"> Navigator Four </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
}
.el-menu-vertical {
  width: 300px;
}
</style>
