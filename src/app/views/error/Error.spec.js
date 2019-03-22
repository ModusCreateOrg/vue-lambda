import cloneDeep from "lodash.clonedeep";

import { createWrapper } from "../../../test/factory/vue/component";
import VueLambdaError from "./Error.vue";
import VueLambdaBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs.vue";

const mockProps = cloneDeep({ code: "404" });

describe("app | views | error | Error.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaError,
      customOptions: {
        propsData: mockProps,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders VueLambdaBreadcrumbs", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaError,
      customOptions: {
        propsData: mockProps,
      },
    });
    expect(wrapper.find(VueLambdaBreadcrumbs).exists()).toBe(true);
  });

  test("renders error code", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaError,
      customOptions: {
        propsData: mockProps,
      },
    });
    expect(wrapper.text()).toContain(mockProps.code);
  });
});

describe("app | views | error | Error.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaError,
      customOptions: {
        propsData: mockProps,
      },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="error-container"
>
  <vue-lambda-breadcrumbs-stub
    links="[object Object]"
  />
   
  <h1>
    
    &lt; 404 - Not Found /&gt;
  
  </h1>
</div>
`);
  });
});
