<template>
  <div id="app">
    <div class="wrapper">
      <HeaderBlock />
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderBlock from "@/components/HeaderBlock.vue";

export default {
  name: "App",
  components: {
    HeaderBlock,
  },
};
</script>

<style lang="scss">
.wrapper {
  height: 100%;
  min-height: 100vh;
  background-color: #ded8d8;
}
</style>
