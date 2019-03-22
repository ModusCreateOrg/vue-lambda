<template>
  <main class="layout-main-container">
    <router-view />
  </main>
</template>

<script>
export default {
  name: "VueLambdaMain",
};
</script>

<style lang="scss" scoped>
@import "../../styles/responsive";

.layout-main-container {
  @media screen and (min-width: $min-width-sm) {
    padding: 1rem 10%;
  }
  @media screen and (min-width: $min-width-md) {
    padding: 1rem 20%;
  }
  @media screen and (min-width: $min-width-lg) {
    padding: 1rem 25%;
  }
  @media screen and (min-width: $min-width-xl) {
    padding: 1rem 30%;
  }
  padding: 1rem;
  transition: filter 250ms;
}
</style>
