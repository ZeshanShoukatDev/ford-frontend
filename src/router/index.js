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
      path: "/inventory/:model",
      name: "model-inventory",
      component: ModelInventoryView,
    },
  ],
});

export default router;
