// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/roullet",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Roullet",
        component: () => import("@/views/Roullet.vue"),
      },
    ],
  },
  {
    path: "/ladder",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Ladder",
        component: () => import("@/views/Ladder.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
