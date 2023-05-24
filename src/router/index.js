import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
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
        }
      ]
    },
    {
      path: "/homepage",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/social",
      component: () => import("../views/SocialPage.vue"),
    },
    }
  ],
});
