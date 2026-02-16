import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ModelInventoryView from "../views/ModelInventoryView.vue";
import { useAuthStore } from "@/stores/admin/auth";


const publicRoutes = [
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
];

const adminRoutes = [
  {
    path: "/admin",
    redirect: "/admin/login",
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("../views/admin/Login.vue"),
        meta: { requiresAuth: false, isAdmin: true },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "ford-data",
        name: "FordDataManagement",
        component: () =>
          import("../views/admin/FordDataManagement.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "banner-configurations",
        name: "BannerConfigurations",
        component: () => import("../views/admin/Media.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "terms-configurations",
        name: "TermsConfigurations",
        component: () => import("../views/admin/TermsConfiguration.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "dealers",
        name: "Dealers",
        component: () => import("../views/admin/Dashboard.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "categories",
        name: "Categories",
        component: () => import("../views/admin/Dashboard.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "users",
        name: "Users",
        component: () => import("../views/admin/Dashboard.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/admin/Dashboard.vue"),
        meta: { requiresAuth: true, layout: "main", isAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...adminRoutes],
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Only run on admin routes
  if (to.meta.isAdmin) {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return next("/admin/login");
    }

    if (to.path === "/admin/login" && authStore.isAuthenticated) {
      return next("/admin/banner-configurations");
    }
  }

  next();
});


router.beforeEach((to, from, next) => {
  const validLocations = [
    "louisville",
    "tricities",
    "bluefield",
    "lexington",
    "charleston",
    "evansville",
  ];

  if (
    (to.name === "location-home" ||
      to.name === "model-inventory") &&
    !validLocations.includes(to.params.location)
  ) {
    return next({ name: "home" });
  }

  next();
});

export default router;
