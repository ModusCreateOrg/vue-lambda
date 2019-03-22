import { createWrapper } from "../../../test/factory/vue/component";
import VueLambdaPwa from "./Pwa.vue";

describe("app | views | pwa | Pwa.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaPwa });
    expect(wrapper.exists()).toBe(true);
  });
});

describe("app | views | pwa | Pwa.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaPwa });
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="pwa-container"
>
  <h1>
    &lt; Vue Lambda /&gt;
  </h1>
</div>
`);
  });
});
