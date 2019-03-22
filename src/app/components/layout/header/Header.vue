<template>
  <header class="layout-header-container">
    <router-link :to="{ name: routeHomeName }" exact title="Vue Lambda">
      <img :src="logoSrc" alt="Vue Lambda Logo" title="Vue Lambda" />
    </router-link>
  </header>
</template>

<script>
import RouterConstants from "../../../router/constants";

export default {
  data() {
    return {
      logoSrc: require("./logo.png"),
      routeHomeName: RouterConstants.ROUTE.HOME.NAME,
    };
  },
  name: "VueLambdaHeader",
};
</script>

<style lang="scss" scoped>
@import "../../styles/responsive";
@import "../../styles/theme";

header {
  background-color: $primary-color-dark;
  box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.16),
    0 0.1875rem 0.375rem rgba(0, 0, 0, 0.23);
  color: $primary-color-dark-text;
  height: $header-height;
  line-height: $header-height;
  overflow: hidden;
  /* stylelint-disable-next-line scss/at-function-named-arguments */
  padding: env(safe-area-inset-top) 5rem 0;
  position: relative;
  text-align: center;
  z-index: 1;

  a {
    height: $header-height;
    left: calc(50% - #{$header-height / 2});
    position: absolute;
    top: 0;
    width: $header-height;

    > img {
      height: calc(100% - 1rem);
      margin: 0.5rem auto;
      width: calc(100% - 1rem);
    }
  }
}
</style>
