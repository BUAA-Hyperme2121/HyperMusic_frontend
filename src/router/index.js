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
                    children: [{
                            path: "playlist/:id",
                            name: 'Playlist',
                            component: () =>
                                import ("../views/ListPage/PlaylistPage.vue"),
                            props: true,
                        },
                        {
                            path: "singerList/:id",
                            name: 'Singerlist',
                            component: () =>
                                import ("../views/ListPage/SingerListPage.vue"),
                            props: true,
                        },
                    ],
                },
            ],
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
                {
                    path: 'song',
                    component: () =>
                        import ("../views/homepage/SongPage.vue"),
                },
            ]
        },
        {
            path: "/album/:id",
            name: "AlbumPage",
            component: () =>
                import ("../views/specific/AlbumPage.vue"),
            props: true,
        },
        {
            path: "/singer/:id",
            name: "SingerPage",
            component: () =>
                import ("../views/specific/SingerPage.vue"),
            props: true,
        },
        {
            path: "/song/:id",
            name: "TestPage",
            component: () =>
                import ("../views/specific/SongPage.vue"),
            props: true,
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
        },
        {
            path: "/creator",
            component: () =>
                import ("../views/Creator.vue"),
        }
    ],
});