<template>
  <div class="wrapper">
    <el-card style="width: 500px; margin: 0px auto">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          label="Вход"
          name="log in"
          style="
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: left;
          "
        >
          <el-input
            placeholder="Почта"
            v-model="login.email"
            type="email"
          ></el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="Пароль"
            v-model="login.password"
            type="password"
          ></el-input>
          <el-button style="margin-top: 10px" @click="_login">Войти</el-button>
        </el-tab-pane>
        <el-tab-pane
          label="Регистрация"
          name="register"
          style="
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: left;
          "
        >
          <el-input
            placeholder="Никнейм"
            v-model="register.login"
            type="text"
          ></el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="Почта"
            v-model="register.email"
            type="email"
          ></el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="Пароль"
            v-model="register.password"
            type="password"
          ></el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="Повторите пароль"
            v-model="register.repassword"
            type="password"
          ></el-input>
          <el-button style="margin-top: 10px" @click="_register"
            >Зарегистрироваться</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: "log in",
      login: {
        email: "",
        password: "",
      },
      register: {
        login: "",
        email: "",
        password: "",
        repassword: "",
      },
    };
  },
  methods: {
    async _login() {
      const response = await this.$store
        .dispatch("auth/login", this.login)
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
      if (response.status == 200) this.$router.push("/courses");
    },
    async _register() {
      const response = await this.$store
        .dispatch("auth/register", this.register)
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
      if (response.status == 200) this.$router.push("/courses");
      else
        this.$message({
          type: "error",
          message: response.data,
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 70%;
  margin: 0px auto;
  padding-top: 100px;
}
</style>
