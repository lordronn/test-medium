import axios from "axios";
import Vue from "vue";

export const postModule = {
  state: () => ({
    posts: [],
    postsPerPage: 10,
    pageNumber: "",
  }),
  getters: {
    getPostList(state) {
      let from = (state.pageNumber - 1) * state.postsPerPage;
      let to = from + state.postsPerPage;
      return state.posts.slice(from, to);
    },
  },
  mutations: {
    newPosts(state, posts) {
      state.posts = posts;
    },
    savePost(state, post) {
      const createFullPost = {
        id: post.id || state.posts.length + 1,
        title: post.title,
        description: post.description,
        claps: post.claps || 0,
        userId: 1,
        createdAt: post.createdAt || Vue.moment().format(),
        updateAt: Vue.moment().format(),
      };
      if (post.editing) {
        state.posts = state.posts.map((post) =>
          post.id === createFullPost.id ? (post = createFullPost) : post
        );
      } else {
        state.posts.push(createFullPost);
      }
    },
    deletePost(state, id) {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
    chengesNumPage(state, num) {
      state.pageNumber = num;
    },
    addClaps(state, postId) {
      state.posts = state.posts.map((post) =>
        post.id === postId ? { ...post, claps: ++post.claps } : post
      );
    },
  },
  actions: {
    async getPosts({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        commit("newPosts", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
