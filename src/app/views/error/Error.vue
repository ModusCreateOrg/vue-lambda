<template>
  <div class="error-container">
    <vue-lambda-breadcrumbs :links="breadcrumbLinks" />
    <h1>
      &lt; {{ code }}{{ codeDescription ? ` - ${codeDescription}` : "" }} /&gt;
    </h1>
  </div>
</template>

<script>
import VueLambdaBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs.vue";
import ResponseHelper from "../../../shared/helpers/response-helper";

export default {
  components: {
    VueLambdaBreadcrumbs,
  },
  computed: {
    breadcrumbLinks() {
      return [
        {
          path: "#",
          title: this.title,
        },
      ];
    },
    codeDescription() {
      return ResponseHelper.httpCodeToStatusDescription({
        httpCode: this.code,
      });
    },
    title() {
      return `Error: ${this.code}`;
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          content: this.title,
          name: "description",
          vmid: "description",
        },
        { content: "noindex, follow", name: "robots", vmid: "robots" },
      ],
      title: this.title,
    };
  },
  name: "VueLambdaError",
  props: {
    code: {
      default: "404",
      type: String,
      required: true,
      validator(code) {
        const codeAsInt = parseInt(code, 10);
        return codeAsInt >= 400 && codeAsInt <= 599;
      },
    },
  },
};
</script>
