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
  components: {
    PostItem,
  },
  data() {
    return {
      pageNumber: 1,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      pageNum: (state) => state.post.pageNumber,
      postsPerPage: (state) => state.post.postsPerPage,
    }),
    ...mapGetters({
      getPostList: "post/getPostList",
    }),
  },
  methods: {
    ...mapMutations({
      changesNumPage: "post/changesNumPage",
    }),
  },
  beforeUpdate() {
    this.changesNumPage(this.pageNumber);
  },
  beforeMount() {
    this.pageNumber = this.pageNum;
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
