<template>
  <b-navbar class="">
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'Posts' }">
        <b-button type="button is-info is-selected" outlined>Posts</b-button>
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'Post' }"
        v-if="checkRoleWriter"
      >
        <b-button type="button is-info is-selected" outlined>
          Create post
        </b-button>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div" role v-if="role">
        <p>User: {{ role }}</p>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Login' }" v-if="!role">
        <b-button type="is-link " outlined>Login</b-button>
      </b-navbar-item>

      <b-navbar-item tag="router-link" :to="{ name: 'Login' }" v-if="role">
        <b-button type="is-danger" outlined @click="logout">Log out</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "CustomHeader",
    };
  },
  computed: {
    ...mapGetters({
      checkRoleWriter: "user/checkRoleWriter",
    }),
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
  async created() {
    await this.getUsers();
    await this.getPosts();
  },
};
</script>
