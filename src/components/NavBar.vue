<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    style="position: fixed; z-index: 100; width: 100%"
  >
    <img
      src="@/assets/logo.png"
      style="width: 50px; padding: 5px; margin-left: 10px; margin-right: 10px"
    />
    <el-menu-item index="1" name="Курсы">Курсы</el-menu-item>
    <el-menu-item index="2" name="Блог">Блог</el-menu-item>
    <el-menu-item index="3" name="Войти">{{
      this.$store.getters["auth/isLoggedIn"] ? $store.state.auth.login : "Войти"
    }}</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      routes: {
        "/courses": "1",
        "/blog": "2",
        "/auth": "3",
        "/profile": "3",
      },
    };
  },
  computed: {
    activeIndex() {
      return this.routes[this.$route.path];
    },
  },
  methods: {
    handleSelect(i) {
      if (i == 1) {
        this.$router.replace("/courses");
      }
      if (i == 2) {
        this.$router.replace("/blog");
      }
      if (i == 3) {
        if (this.$store.getters["auth/isLoggedIn"])
          this.$router.replace("/profile");
        else this.$router.replace("/auth");
      }
    },
  },
};
</script>
<style></style>
