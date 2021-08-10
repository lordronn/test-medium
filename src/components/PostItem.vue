<template>
  <div class="post">
    <p class="post__title">{{ post.title }}</p>
    <p class="post__description">{{ post.description }}</p>
    <div class="info">
      <p class="info__time">{{ relativeTime }}</p>
      <b-button
        type="is-info"
        icon-left="sign-language"
        v-if="checkRoleReader"
        @click="addClaps(post.id)"
      >
        {{ post.claps }}
      </b-button>
      <div v-if="checkRoleWriter" class="info__control">
        <b-button
          tag="router-link"
          :to="{ name: 'Post', params: { editPost: post } }"
          type="has-background-info-light"
          icon-left="edit"
          outlined
        >
          Edit post
        </b-button>
        <b-button
          type="has-background-danger-light"
          icon-left="trash-alt"
          @click="deletePost(post.id)"
        >
          Delete post
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "PostItem",
  props: {
    post: {
      id: String,
      title: String,
      description: String,
      claps: Number,
      updateAt: String,
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      relativeTime: this.$moment(this.post.updateAt).fromNow(),
    };
  },
  methods: {
    ...mapMutations({
      deletePost: "post/deletePost",
      addClaps: "post/addClaps",
    }),
  },
  computed: {
    ...mapGetters({
      checkRoleWriter: "user/checkRoleWriter",
      checkRoleReader: "user/checkRoleReader",
    }),
    ...mapState({
      userRole: (state) => state.user.role,
    }),
  },
};
</script>
<style lang="scss" scoped>
.post {
  background-color: #ffffff;
  border: 2px solid powderblue;
  padding: 15px;
  &__title {
    font-size: 24px;
    font-weight: 600;
  }
  &__description {
    font-size: 18px;
    text-align: justify;
    margin-bottom: 15px;
  }
}
.info {
  display: flex;
  justify-content: space-between;
  &__control {
    grid-template-columns: 1fr 1fr;
    display: grid;
    gap: 15px;
  }
  &__time {
    height: fit-content;
    margin-top: auto;
  }
}
</style>
