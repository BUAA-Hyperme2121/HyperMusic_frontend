import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
            path: "/",
            redirect: "/homepage",
        },
        {
            path: "/user",
            redirect: "/user/home",
            component: () =>
                import ("../views/UserPage.vue"),
            children: [{
                    path: "home",
                    component: () =>
                        import ("../views/UserHome.vue"),
                },
                {
                    path: "music",
                    component: () =>
                        import ("../views/UserMusic.vue"),
                }
            ]
        },
        {
            path: '/homepage',
            redirect: "/homepage/discover",
            component: () =>
                import ("../views/HomePage.vue"),
            children: [{
                    path: 'discover',
                    component: () =>
                        import ("../views/homepage/DiscoverPage.vue"),
                },
                {
                    path: 'toplist',
                    component: () =>
                        import ("../views/homepage/TopListPage.vue"),
                },
                {
                    path: 'playlist',
                    component: () =>
                        import ("../views/homepage/PlayListPage.vue"),
                },
                {
                    path: 'artist',
                    component: () =>
                        import ("../views/homepage/ArtistPage.vue"),
                },
            ]
        },
        {
            path: "/search",
            component: () =>
                import ("../views/Search.vue"),
        },
        {
            path: "/social",
            component: () =>
                import ("../views/SocialPage.vue"),
        }
    ],
});