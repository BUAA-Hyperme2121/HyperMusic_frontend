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
          children: [
            {
              path: "playlist/:id",
              name: 'Playlist',
              component: () => import("../views/ListPage/PlaylistPage.vue"),
              props: true,
            },
            {
              path: "singerList/:id",
              name: 'Singerlist',
              component: () => import("../views/ListPage/SingerListPage.vue"),
              props: true,
            },
          ],
        },
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
  ],
});
