<template>
  <b-navbar class="">
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-button type="button is-info is-selected" outlined>Posts</b-button>
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/post' }"
        v-if="role === 'writer'"
      >
        <b-button type="button is-info is-selected" outlined
          >Create post</b-button
        >
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div" role>
        <p>{{ role }}</p>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/login' }" v-if="!role">
        <b-button type="is-link " outlined>Login</b-button>
      </b-navbar-item>

      <b-navbar-item tag="router-link" :to="{ path: '/login' }" v-if="role">
        <b-button type="is-danger" outlined @click="logout">Log out</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "HeaderBlock",
    };
  },
  computed: {
    ...mapState({
      role: (state) => state.user.role,
    }),
  },
  methods: {
    ...mapMutations({
      logout: "user/logout",
    }),
    ...mapActions({
      getUsers: "user/getUsers",
      getPosts: "post/getPosts",
    }),
  },
  mounted() {
    this.getUsers();
    this.getPosts();
  },
};
</script>
