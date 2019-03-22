import { createWrapper } from "../../../test/factory/vue/component";
import VueLambdaLayout from "./Layout.vue";
import VueLambdaStyles from "../styles/Styles.vue";
import VueLambdaFooter from "./footer/Footer.vue";
import VueLambdaHeader from "./header/Header.vue";
import VueLambdaMain from "./main/Main.vue";

describe("app | components | layout | Layout.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaLayout });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders VueLambdaStyles", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaLayout });
    expect(wrapper.find(VueLambdaStyles).exists()).toBe(true);
  });

  test("renders VueLambdaHeader", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaLayout });
    expect(wrapper.find(VueLambdaHeader).exists()).toBe(true);
  });

  test("renders VueLambdaMain", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaLayout });
    expect(wrapper.find(VueLambdaMain).exists()).toBe(true);
  });

  test("renders VueLambdaFooter", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaLayout });
    expect(wrapper.find(VueLambdaFooter).exists()).toBe(true);
  });
});

describe("app | components | layout | Layout.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaLayout });
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="layout-container"
  id="vue-lambda"
>
  <vue-lambda-styles-stub />
   
  <vue-lambda-header-stub />
   
  <div
    class="main-container"
  >
    <vue-lambda-main-stub />
  </div>
   
  <vue-lambda-footer-stub />
</div>
`);
  });
});
