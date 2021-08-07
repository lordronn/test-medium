<template>
  <div class="posts columns is-centered">
    <div class="column posts__wrapper is-5">
      <PostItem v-for="post in getPostList" :key="post.id" :post="post" />
      <b-pagination
        v-if="getPostList.length && posts.length > postsPerPage"
        v-model="pageNumber"
        :total="posts.length"
        :per-page="postsPerPage"
      >
      </b-pagination>
      <div v-if="!getPostList.length">
        <b-message type="is-warning" has-icon>Posts not found!</b-message>
      </div>
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "PostsPage",
  data() {
    return {
      pageNumber: 1,
    };
  },
  components: {
    PostItem,
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      postsPerPage: (state) => state.post.postsPerPage,
    }),
    ...mapGetters({
      getPostList: "post/getPostList",
    }),
  },
  methods: {
    ...mapMutations({
      chengesNumPage: "post/chengesNumPage",
    }),
  },
  beforeUpdate() {
    this.chengesNumPage(this.pageNumber);
  },
};
</script>

<style lang="scss" scoped>
.posts {
  &__wrapper {
    display: flex;
    padding-top: 50px;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
