import Vue from "vue";
import VueRouter from "vue-router";
// import { Message } from 'element-ui';
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
        }
      ]
    },
    {
      path: "/homepage",
      redirect: "/homepage/discover",
      component: () => import("../views/HomePage.vue"),
      children: [
        {
          path: "discover",
          component: () => import("../views/homepage/DiscoverPage.vue"),
        },
        {
          path: "toplist",
          component: () => import("../views/homepage/TopListPage.vue"),
        },
        {
          path: "playlist",
          component: () => import("../views/homepage/PlayListPage.vue"),
        },
        {
          path: "artist",
          component: () => import("../views/homepage/ArtistPage.vue"),
        },
        {
          path: "song",
          component: () => import("../views/homepage/SongPage.vue"),
        },
      ],
    },
    {
      path: "/album/:id",
      name: "AlbumPage",
      component: () => import("../views/AlbumPage.vue"),
      props: true,
    },
    {
      path: "/singer/:id",
      name: "SingerPage",
      component: () => import("../views/SingerPage.vue"),
      props: true,
    },
    {
      path: "/song/:id",
      name: "SongPage",
      component: () => import("../views/SongPage.vue"),
      props: true,
    },
    {
      path: "/search",
      component: () => import("../views/Search.vue"),
    },
    {
      path: "/social",
      component: () => import("../views/SocialPage.vue"),
    }
  ],
});

// router.beforeEach((to, from, next) => {
//   // 获取用户登录信息
//   const userInfo = localStorage.getItem("loginInfo").user;

//   // 若用户未登录且访问的页面需要登录，则跳转至登录页面
//   if (userInfo == null && to.meta.requireAuth) {
//     Message({
//       type: "warning",
//       message: "请先登录！",
//     });
//     next({
//       name: "LoginPage",
//     });
//   }

//   next();
// });

export default router;
