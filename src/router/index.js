import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import PostPage from "@/views/PostPage.vue";
import PostsPage from "@/views/PostsPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: PostsPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/post",
    name: "Post",
    component: PostPage,
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
