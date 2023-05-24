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
        },
        {
          path: "setting",
          component: () => import("../views/UserSetting.vue"),
        },
        {
          path: "message",
          component: () => import("../views/UserMessage.vue"),
          // redirect: "/user/message/comment",
          children: [
            {
              path: "comment",
              component: () => import("../views/Message/MyCommentPage.vue"),
            },
            {
              path: "complaint",
              component: () => import("../views/Message/ComplaintPage.vue"),
            },
            {
              path: "complaint-detail",
              component: () =>
                import("../views/Message/ComplaintDetailPage.vue"),
            },
            {
              path: "notice",
              component: () => import("../views/Message/NoticePage.vue"),
            },
            {
              path: "exam",
              component: () => import("../views/Message/ExamPage.vue"),
            },
            {
              path: "exam-detail",
              component: () => import("../views/Message/ExamDetailPage.vue"),
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
      children: [
        {
          path: "follow",
          component: () => import("../views/Social/FollowPage.vue"),
        },
        {
          path: "fan",
          component: () => import("../views/Social/FanPage.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterPage.vue"),
    },
    // 404页面
    {
      path: "/404",
      component: () => import("../views/NotFoundPage.vue"),
    },
    // 所有未定义路由，全部重定向到404页面
    {
      path: "*",
      redirect: "/404",
    },
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
