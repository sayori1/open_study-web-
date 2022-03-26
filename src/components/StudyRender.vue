<template>
  <div>
    <component
      v-for="c in render"
      :key="c.type"
      :is="c.type"
      :data="c"
      >{{
    }}</component>
  </div>
</template>
<script>
import BodyComponent from "./studyComponents/BodyComponent.vue";
import HeadingComponent from "./studyComponents/HeadingComponent.vue";
import QuizComponent from "./studyComponents/QuizComponent.vue";
export default {
  components: {
    Body: BodyComponent,
    Heading: HeadingComponent,
    Quiz: QuizComponent,
  },
  props: {
    render: [],
  },
  mounted() {},
};
</script>
<style scoped></style>
