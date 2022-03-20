<template>
  <div class="wrapper">
    <div class="topbar">
      <div class="column">
        <a><strong>Логин: </strong>{{ this.$store.state.auth?.user?.login }}</a>
        <a>Самостоятельное обучение</a>
      </div>
      <div class="column" style="align-items: center">
        <img
          src="@/assets/progress.png"
          style="width: 50px; height: 50px; margin-bottom: 10px"
        />
        <strong style="font-size: large"> 165 балла</strong>
      </div>
    </div>
    <div style="display: flex; flex-direction: row">
      <div class="leftbar">
        <el-button @click="exit">Выйти</el-button>
      </div>
      <div class="content">
        <a>Активность:</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("auth/refresh");
  },
  methods: {
    exit() {
      this.$store.dispatch("auth/exit");
      this.$router.back();
    },
  },
};
</script>

<style>
.wrapper {
  margin-top: 100px;
  width: 70%;
  margin: 0px auto;
}
.topbar {
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.leftbar {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: flex-start;
}
.content {
  margin-left: 50px;
  padding: 30px;
}
</style>
