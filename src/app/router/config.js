import Routes from "./routes";

export default {
  fallback: false,
  mode: "history",
  routes: [...Routes],
  scrollBehavior: () => ({ x: 0, y: 0 }),
};
