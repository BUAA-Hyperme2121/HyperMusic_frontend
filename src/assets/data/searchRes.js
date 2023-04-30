const SongsRes = [{
        id: 1,
        name: "歌曲 1",
        duration: "04:30",
        singer: "歌手 A",
    },
    {
        id: 2,
        name: "歌曲 2",
        duration: "03:45",
        singer: "歌手 B",
    },
    {
        id: 3,
        name: "歌曲 3",
        duration: "05:12",
        singer: "歌手 C",
    },
];
const PlayListsRes = [{
        cover: require('@/assets/img/homepageTest/test.jpg'),
        title: "魔杰座",
        num: "18",
        creator: "小黄人",
        likes: "199000",
        viewCounts: "2500万"
    },
    {
        cover: require('@/assets/img/homepageTest/test.jpg'),
        title: "范特西",
        num: "18",
        creator: "小黄人",
        likes: "300000",
        viewCounts: "3000万"
    },
    {
        cover: require('@/assets/img/homepageTest/test.jpg'),
        title: "依然范特西",
        num: "20",
        creator: "小黄人",
        likes: "309000",
        viewCounts: "3600万"
    }
];
const ArtistsRes = [{
        title: "林俊杰",
        cover: require('@/assets/img/homepageTest/test.jpg'),
    },
    {
        title: "周杰伦",
        cover: require('@/assets/img/homepageTest/test.jpg'),
    },
    {
        title: "陈奕迅",
        cover: require('@/assets/img/homepageTest/test.jpg'),
    }
];
const UsersRes = [{
        headPortrait: require('@/assets/img/homepageTest/icon.jpg'),
        userName: "厄加特",
        playLists: "18",
        followers: "20000"
    },
    {
        headPortrait: require('@/assets/img/homepageTest/icon.jpg'),
        userName: "科加斯",
        playLists: "18",
        followers: "20000"
    },
    {
        headPortrait: require('@/assets/img/homepageTest/icon.jpg'),
        userName: "加里奥",
        playLists: "18",
        followers: "20000"
    }
];
export {
    SongsRes,
    PlayListsRes,
    ArtistsRes,
    UsersRes
}