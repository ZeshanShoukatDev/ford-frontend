import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ModelInventoryView from "../views/ModelInventoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/homepage",
    },
    {
      path: "/homepage",
      name: "homepage",
      component: HomeView,
    },
    {
      path: "/homepage/:location",
      name: "homepage-with-location",
      component: HomeView,
    },
    {
      path: "/homepage/:location/inventory/:model",
      name: "model-inventory",
      component: ModelInventoryView,
      props: true,
    },
  ],
});

// Navigation guard to check location
router.beforeEach((to, from, next) => {
  const validLocations = ["louisville", "tricities"];

  if (to.name === "model-inventory" && !to.params.location) {
    // If no location is set, redirect to homepage with a flag
    next({
      name: "homepage",
      query: {
        needLocation: "true",
        intendedModel: to.params.model,
      },
    });
  } else {
    next();
  }
});

export default router;
