import { createWrapper } from "../../../test/factory/vue/component";
import VueLambdaCustom from "./Custom.vue";

describe("app | components | styles | Custom.vue (unit)", () => {
  test("renders", () => {
    const wrapper = createWrapper({ component: VueLambdaCustom });
    expect(wrapper.exists()).toBe(true);
  });
});

describe("app | components | styles | Custom.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaCustom });
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="styles-custom-container"
/>
`);
  });
});
