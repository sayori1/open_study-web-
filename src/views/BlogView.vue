<template>
  <div class="wrapper">
    <ArticleComponent></ArticleComponent>
  </div>
</template>

<script>
import ArticleComponent from "@/components/ArticleComponent.vue";
export default {
  components: { ArticleComponent },
  data() {
    return {};
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
