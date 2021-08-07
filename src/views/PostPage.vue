<template>
  <div class="post columns is-centered">
    <div class="column is-5 has-background-white-bis">
      <b-field label="Title">
        <b-input v-model.trim="post.title" required ref="titleValid"></b-input>
      </b-field>
      <b-field label="Message">
        <b-input
          v-model.trim="post.description"
          maxlength="500"
          type="textarea"
          ref="descriptionValid"
          required
        ></b-input>
      </b-field>
      <b-button
        class=""
        type="is-light is-primary"
        icon-left="save"
        @click="savePost()"
      >
        Save
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Post-page",
  props: {
    editPost: {
      id: String,
      title: String,
      description: String,
      claps: Number,
      updateAt: String,
      type: Object,
    },
  },
  data() {
    return {
      post: {
        title: "",
        description: "",
        editing: false,
      },
    };
  },
  methods: {
    ...mapState({}),
    ...mapMutations({
      savePostInStore: "post/savePost",
      serchPost: "post/serchPost",
    }),
    checkValid() {
      const checkTitle = this.$refs.titleValid.checkHtml5Validity();
      const checkDesc = this.$refs.descriptionValid.checkHtml5Validity();
      return checkTitle && checkDesc;
    },
    savePost() {
      if (this.checkValid()) {
        this.savePostInStore(this.post, this.checkProps);
        this.$router.push("/");
      }
    },
  },
  components: {},
  mounted() {
    if (this.editPost) {
      this.post = this.editPost;
      this.post.editing = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 25px;
}
</style>
