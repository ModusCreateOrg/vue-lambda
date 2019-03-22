import { createWrapper } from "../../../test/factory/vue/component";
import VueLambdaHome from "./Home.vue";

describe("app | views | home | Home.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaHome });
    expect(wrapper.exists()).toBe(true);
  });
});

describe("app | views | home | Home.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaHome });
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="home-container"
>
  <h1>
    &lt; Vue Lambda /&gt;
  </h1>
</div>
`);
  });
});
