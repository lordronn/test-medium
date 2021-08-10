<template>
  <section class="section post columns is-centered">
    <div class="column is-5">
      <b-field label="Email">
        <b-input
          placeholder="Email"
          type="email"
          icon-pack="fas"
          icon="envelope"
          v-model.trim="email"
          required
          ref="emailValid"
        >
        </b-input>
      </b-field>
      <b-field label="Password">
        <b-input
          type="password"
          placeholder="Password"
          v-model.trim="password"
          password-reveal
          required
          ref="passwordValid"
        >
        </b-input>
      </b-field>
      <div class="buttons">
        <button class="button is-success" @click="submit()">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Submit</span>
        </button>
      </div>
      <b-message v-if="!checkUser" type="is-danger" has-icon>
        Wrong login or password!
      </b-message>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "LoginPage",
  data: () => ({
    email: "",
    password: "",
  }),
  computed: {
    ...mapState({
      role: (state) => state.user.role,
      checkUser: (state) => state.user.check,
    }),
  },
  methods: {
    ...mapActions({
      searchUser: "user/searchUser",
    }),
    checkValid() {
      const checkMail = this.$refs.emailValid.checkHtml5Validity();
      const checkPass = this.$refs.passwordValid.checkHtml5Validity();
      return checkMail && checkPass;
    },
    resetForm() {
      this.email = "";
      this.password = "";
    },
    submit() {
      if (this.checkValid()) {
        const userInfo = {
          userEmail: this.email,
          userPassword: String(this.password),
        };
        this.searchUser(userInfo);
        if (this.checkUser) {
          this.resetForm();
          this.$router.push({ name: "Posts" });
        }
      }
    },
  },
};
</script>
