import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ModelInventoryView from "../views/ModelInventoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:location",
      name: "location-home",
      component: HomeView,
      props: true,
    },
    {
      path: "/:location/inventory/:model",
      name: "model-inventory",
      component: ModelInventoryView,
      props: true,
    },
  ],
});

// Navigation guard to check location
router.beforeEach((to, from, next) => {
  const validLocations = ["louisville", "tricities", "bluefield", "lexington"];

  if (
    to.name === "location-home" &&
    !validLocations.includes(to.params.location)
  ) {
    next({ name: "home" });
  } else if (
    to.name === "model-inventory" &&
    !validLocations.includes(to.params.location)
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
