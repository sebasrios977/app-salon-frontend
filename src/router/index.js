import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/reservaciones",
      name: "appointments",
      component: () => import("../views/appointments/AppointmentsLayout.vue"),
      children: [
        {
          path: "nueva",
          component: () =>
            import("../views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "new-appointment",
              component: () => import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "appointment-details",
              component: () => import("../views/appointments/AppointmentView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
      ]
    },
  ],
});

export default router;
