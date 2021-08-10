import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: () =>
      import(/* webpackChunkName: "homeRoute" */ "@/views/PostsPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "loginRoute" */ "@/views/LoginPage.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "postRoute" */ "@/views/PostPage.vue"),
    props: (route) => ({ editPost: route.params.editPost }),
  },

  {
    path: "*",
    redirect: { name: "Posts" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
