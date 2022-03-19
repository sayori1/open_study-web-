<template>
  <div class="card" @click="$router.push(`/course/${course._id}`)">
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div>
        <h2 style="margin-top: 0px">{{ course.name }}</h2>
        <a>{{ course.description }}</a>
      </div>
      <el-image
        style="height: 50px; width: 50px"
        :src="course.image"
      ></el-image>
    </div>

    <div>
      <el-rate
        v-bind:modelValue="course.rating"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} оценка"
        style="margin-bottom: 5px"
      >
      </el-rate>
      <div :style="{ color: priceColor }">{{ priceText }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    course: {
      type: Object,
    },
  },
  computed: {
    priceColor() {
      if (this.course.price == 0) {
        return "#55aa55";
      } else {
        return "black";
      }
    },
    priceText() {
      if (this.course.price == 0) {
        return "Бесплатно";
      } else {
        return this.course.price + " Р";
      }
    },
  },
};
</script>
<style scoped>
.author-label {
  margin-top: 5px;
  font-size: 12px;
}
.card {
  color: #222;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 280px;
  height: 200px;
  box-shadow: 0px 0px 10px rgba(200, 200, 200, 200);
  margin: 15px;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.card:hover {
  box-shadow: 0px 0px 15px rgba(200, 200, 200, 200);
  cursor: pointer;
}
</style>
