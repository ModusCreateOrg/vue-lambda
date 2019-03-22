import { createWrapper } from "../../../../test/factory/vue/component";
import VueLambdaHeader from "./Header.vue";

describe("app | components | layout | header | Header.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaHeader });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders img for logo", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaHeader });
    expect(wrapper.find("img").exists()).toBe(true);
  });
});

describe("app | components | layout | header | Header.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaHeader });
    expect(wrapper.element).toMatchInlineSnapshot(`
<header
  class="layout-header-container"
>
  <router-link-stub
    event="click"
    exact="true"
    tag="a"
    title="Vue Lambda"
    to="[object Object]"
  >
    <img
      alt="Vue Lambda Logo"
      src="[object Object]"
      title="Vue Lambda"
    />
  </router-link-stub>
</header>
`);
  });
});
