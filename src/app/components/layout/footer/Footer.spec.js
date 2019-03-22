import { createWrapper } from "../../../../test/factory/vue/component";
import VueLambdaFooter from "./Footer.vue";

function mockDate() {
  const mockDate = new Date("2019-01-01T00:00:00.000Z");
  const _Date = Date;
  global.Date = jest.fn(() => mockDate);
  global.Date.UTC = _Date.UTC;
  global.Date.parse = _Date.parse;
  global.Date.now = _Date.now;
}

describe("app | components | layout | footer | Footer.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaFooter });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders copyright", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ component: VueLambdaFooter });
    expect(wrapper.text()).toContain("©");
  });

  test("renders current year", () => {
    expect.assertions(1);
    mockDate();
    const wrapper = createWrapper({ component: VueLambdaFooter });
    expect(wrapper.text()).toContain(new Date().getUTCFullYear());
  });
});

describe("app | components | layout | footer | Footer.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    mockDate();
    const wrapper = createWrapper({ component: VueLambdaFooter });
    expect(wrapper.element).toMatchInlineSnapshot(`
<footer
  class="layout-footer-container"
>
  <ul>
    <li>
      © Vue Lambda 2019
    </li>
  </ul>
</footer>
`);
  });
});
