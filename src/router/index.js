import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/courses",
  },
  {
    path: "/courses",
    component: () => import("../views/CoursesView.vue"),
  },
  {
    path: "/course/:id",
    component: () => import("../views/CourseView.vue"),
  },
  {
    path: "/blog",
    component: () => import("../views/BlogView.vue"),
  },
  {
    path: "/auth",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/study/:id",
    component: () => import("../views/StudyView.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/Admin/AdminView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
