<template>
  <div class="styles-container">
    <vue-lambda-styles-reset />
    <vue-lambda-styles-custom />
  </div>
</template>

<script>
// Imports ordered intentially for <style> order in <head> of rendered HTML
import VueLambdaStylesReset from "./Reset.vue";
import VueLambdaStylesCustom from "./Custom.vue";

export default {
  components: {
    VueLambdaStylesCustom,
    VueLambdaStylesReset,
  },
  name: "VueLambdaStyles",
};
</script>

<style lang="scss">
.styles-container {
  display: none;
}
</style>
