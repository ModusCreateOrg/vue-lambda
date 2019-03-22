import Vue from "vue";
import Router from "vue-router";

import RouterConfig from "./config";

Vue.use(Router);

const createRouter = () => new Router(RouterConfig);

export default createRouter;
