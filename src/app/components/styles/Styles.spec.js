import { createWrapper } from "../../../test/factory/vue/component";
import VueLambdaStyles from "./Styles.vue";
import VueLambdaStylesReset from "./Reset.vue";
import VueLambdaStylesCustom from "./Custom.vue";

describe("app | components | styles | Styles.vue (unit)", () => {
  test("renders", () => {
    const wrapper = createWrapper({ component: VueLambdaStyles });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders VueLambdaStylesReset", () => {
    const wrapper = createWrapper({ component: VueLambdaStyles });
    expect(wrapper.find(VueLambdaStylesReset).exists()).toBe(true);
  });

  test("renders VueLambdaStylesCustom", () => {
    const wrapper = createWrapper({ component: VueLambdaStyles });
    expect(wrapper.find(VueLambdaStylesCustom).exists()).toBe(true);
  });
});

describe("app | components | styles | Styles.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaStyles });
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="styles-container"
>
  <vue-lambda-styles-reset-stub />
   
  <vue-lambda-styles-custom-stub />
</div>
`);
  });
});
