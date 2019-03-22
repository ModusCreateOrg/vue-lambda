import { RouterLinkStub } from "@vue/test-utils";
import cloneDeep from "lodash.clonedeep";

import { createWrapper } from "../../../test/factory/vue/component";
import RouterConstants from "../../router/constants";
import VueLambdaBreadcrumbs from "./Breadcrumbs.vue";

const mockProps = cloneDeep({
  links: [
    {
      path: "/error/404",
      title: "Mock Title",
    },
  ],
});

describe("app | components | breadcrumbs | Breadcrumbs.vue (unit)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaBreadcrumbs,
      customOptions: { propsData: mockProps },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders a RouterLink for Home View", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaBreadcrumbs,
      customOptions: {
        propsData: mockProps,
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const routerLinks = wrapper.findAll(RouterLinkStub);
    const blogRouterLinks = routerLinks.wrappers.filter(
      (routerLink) =>
        routerLink.props().to.name === RouterConstants.ROUTE.HOME.NAME,
    );
    expect(blogRouterLinks).toHaveLength(1);
  });

  test("renders a RouterLink for prop links", () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      component: VueLambdaBreadcrumbs,
      customOptions: {
        propsData: mockProps,
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const routerLinks = wrapper.findAll(RouterLinkStub);
    expect(routerLinks).toHaveLength(1 + mockProps.links.length);

    const blogRouterLinks = routerLinks.wrappers.filter(
      (routerLink) => routerLink.props().to.name === mockProps.links[0].name,
    );
    expect(blogRouterLinks).toHaveLength(1);
  });
});

describe("app | components | breadcrumbs | Breadcrumbs.vue (snapshot)", () => {
  test("renders", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      component: VueLambdaBreadcrumbs,
      customOptions: { propsData: mockProps },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
<nav
  class="breadcrumbs-container"
>
  <ol
    class="breadcrumb"
  >
    <li>
      <router-link-stub
        event="click"
        exact="true"
        tag="a"
        title="Home"
        to="[object Object]"
      >
        Home
      </router-link-stub>
    </li>
     
    <li>
      <router-link-stub
        event="click"
        exact="true"
        tag="a"
        title="Mock Title"
        to="[object Object]"
      >
        Mock Title
      </router-link-stub>
    </li>
  </ol>
</nav>
`);
  });
});
