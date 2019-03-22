import RouterConstants from "./constants";

export default [
  {
    component: () => import("../views/error/Error.vue"),
    name: RouterConstants.ROUTE.ERROR.NAME,
    path: RouterConstants.ROUTE.ERROR.PATH,
    props: true,
  },
  {
    component: () => import("../views/home/Home.vue"),
    name: RouterConstants.ROUTE.HOME.NAME,
    path: RouterConstants.ROUTE.HOME.PATH,
  },
  {
    component: () => import("../views/pwa/Pwa.vue"),
    name: RouterConstants.ROUTE.PWA.NAME,
    path: RouterConstants.ROUTE.PWA.PATH,
  },
];
