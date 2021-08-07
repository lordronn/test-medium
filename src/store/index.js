import Vue from "vue";
import Vuex from "vuex";
import { userModule } from "@/store/userModule";
import { postModule } from "@/store/postModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    post: postModule,
  },
});
