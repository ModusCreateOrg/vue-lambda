<template>
  <div class="styles-custom-container" />
</template>

<script>
export default {
  name: "VueLambdaStylesCustom",
};
</script>

<style lang="scss">
@import "./theme";

/* "System fonts" as used by GitHub */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

html,
body,
#vue-lambda {
  background-color: $primary-color-dark;
  color: $primary-color-text;
}

h1 {
  font-size: 2rem;
  font-weight: 100;
  line-height: 1.2;
  margin: 0 auto;
  text-align: center;
}

a {
  text-decoration: underline;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: $primary-color-text;
  }
}

p {
  line-height: 1.5;
  margin: 0.75rem 0;
}

ol {
  list-style-type: decimal;
}
ul {
  list-style-type: disc;
}

ol,
ul {
  margin: 1rem 0 1rem 3rem;

  > li {
    line-height: 1.35;
    margin: 1rem 0;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

em {
  font-style: italic;
}

strong {
  font-weight: 700;
}

svg {
  max-height: 100%;
  max-width: 100%;
}
</style>
