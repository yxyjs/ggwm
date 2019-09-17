<template>
  <div class="page">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  data() {
    return {};
  },
  components: {
    FooterGuide
  }
};
</script>

<style scoped lang="stylus"></style>
