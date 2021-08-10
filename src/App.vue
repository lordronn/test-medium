<template>
  <div id="app">
    <CustomHeader />
    <router-view />
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";

export default {
  name: "App",
  components: {
    CustomHeader,
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  min-height: 100vh;
  background-color: #ded8d8;
}
</style>
