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
      <b-message v-if="role && loginAttempt" type="is-danger" has-icon>
        Wrong login or password!
      </b-message>
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "LoginPage",
  components: {},
  data: () => ({
    email: "",
    password: "",
    loginAttempt: false,
  }),
  methods: {
    ...mapMutations({
      checkUser: "user/checkUser",
    }),
    checkValid() {
      const checkMail = this.$refs.emailValid.checkHtml5Validity();
      const checkPass = this.$refs.passwordValid.checkHtml5Validity();
      return checkMail && checkPass;
    },
    submit() {
      if (this.checkValid()) {
        const userInfo = {
          userEmail: this.email,
          userPassword: +this.password,
        };
        this.loginAttempt = true;
        if (this.checkUser(userInfo)) {
          this.$store.commit("user/checkUser", userInfo);
          if (this.userActive) {
            this.resetForm();
            this.$router.push("/");
          }
        }
      }
    },

    resetForm() {
      this.email = "";
      this.password = "";
    },
  },
  computed: {
    ...mapState({
      role: (state) => state.user.role,
    }),
  },
};
</script>
