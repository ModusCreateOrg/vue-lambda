<template>
  <nav class="breadcrumbs-container">
    <ol class="breadcrumb">
      <li>
        <router-link title="Home" :to="{ name: routeHomeName }" exact
          >Home</router-link
        >
      </li>
      <li v-for="link in links" :key="link.name">
        <router-link
          :title="link.title"
          :to="{ name: link.name, params: link.params, path: link.path }"
          exact
          >{{ link.title }}</router-link
        >
      </li>
    </ol>
  </nav>
</template>

<script>
import RouterConstants from "../../router/constants";

export default {
  data() {
    return {
      routeHomeName: RouterConstants.ROUTE.HOME.NAME,
    };
  },
  name: "VueLambdaBreadcrumbs",
  props: {
    links: {
      default() {
        return [];
      },
      type: Array,
      required: true,
      validator(links) {
        return links.every(
          (link) =>
            ((link.hasOwnProperty("name") &&
              Object.prototype.toString.call(link.name) === "[object String]" &&
              link.name.length) ||
              (link.hasOwnProperty("path") &&
                Object.prototype.toString.call(link.path) ===
                  "[object String]" &&
                link.path.length)) &&
            link.hasOwnProperty("title") &&
            Object.prototype.toString.call(link.title) === "[object String]" &&
            link.title.length,
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";
@import "../styles/responsive";

.breadcrumbs-container {
  font-size: 0.75rem;

  > ol {
    margin: 0;

    > li {
      @media screen and (min-width: $min-width-sm) {
        margin-bottom: 0.5rem;
      }
      display: inline-block;
      margin: 0 0 0.75rem;

      > a {
        &:hover,
        &:active {
          color: $accent-color-light;
        }
      }

      &:not(:last-child) {
        &::after {
          content: "»";
          margin: 0 0.125rem 0 0.375rem;
        }
      }

      &:last-child {
        font-style: italic;

        > a:not(:hover) {
          text-decoration: none;
        }

        &:not(:nth-child(2)) {
          margin-left: 0.25rem;
        }
      }
    }
  }
}
</style>
