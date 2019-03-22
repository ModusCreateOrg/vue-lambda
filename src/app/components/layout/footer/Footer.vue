<template>
  <footer class="layout-footer-container">
    <ul>
      <li>© Vue Lambda {{ currentYear }}</li>
    </ul>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getUTCFullYear(),
    };
  },
  name: "VueLambdaFooter",
};
</script>

<style lang="scss" scoped>
@import "../../styles/responsive";
@import "../../styles/theme";

footer {
  background-color: $primary-color-dark;
  box-shadow: 0 -0.1875rem 0.375rem rgba(0, 0, 0, 0.16),
    0 -0.1875rem 0.375rem rgba(0, 0, 0, 0.23);
  color: $primary-color-dark-text;
  font-size: 0.75rem;
  height: $footer-height;
  line-height: $footer-height;
  /* stylelint-disable-next-line scss/at-function-named-arguments */
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;
  text-align: center;
  z-index: 1;

  ul {
    list-style: none;
    margin: 0;

    > li {
      display: inline-block;
      margin: 0.5rem;
    }
  }
}
</style>
