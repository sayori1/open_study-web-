<template>
  <div class="card">
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div>
        <h2 style="margin-top: 0px">{{ article.name }}</h2>
        <a>{{ article.description }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: {
        name: "Article name",
        description: "Article description",
      },
    };
  },
};
</script>
<style>
.card {
  color: #222;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 10px rgba(200, 200, 200, 200);
  margin: 15px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
</style>
