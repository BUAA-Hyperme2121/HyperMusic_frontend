import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/homepage",
    },
    {
      path: "/user",
      redirect: "/user/home",
      component: () => import("../views/UserPage.vue"),
      children: [
        {
          path: "home",
          component: () => import("../views/UserHome.vue"),
        },
        {
          path: "music",
          component: () => import("../views/UserMusic.vue"),
        },
        {
          path: "setting",
          component: () => import("../views/UserSetting.vue"),
        },
        {
          path:"message",
          component:()=>import("../views/UserMessage.vue")
        }
      ],
    },
    {
      path: "/homepage",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/social",
      component: () => import("../views/SocialPage.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterPage.vue"),
    },
  ],
});

export default router;
