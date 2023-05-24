const SongsRes = [{
        id: 1,
        name: "Miracle love",
        singer_name: "歌手 A",
        singer_id: 1,
        music_path: require("@/assets/img/Miracle Love.mp3"),
        cover_path: require("@/assets/img/homepageTest/test.jpg"),
    },
    {
        id: 2,
        name: "拥抱",
        singer_name: "歌手 B",
        singer_id: 1,
        music_path: require("@/assets/img/拥抱.mp3"),
        cover_path: require("@/assets/img/homepageTest/icon.jpg"),
    },
    {
        id: 4,
        name: "纯音乐",
        singer_name: "歌手 C",
        singer_id: 1,
        music_path: require("@/assets/img/纯音乐.mp3"),
        cover_path: require("@/assets/img/homepageTest/test.jpg"),
    },
];

const PlayListsRes = [{
        id: '1',
        cover_path: require('@/assets/img/homepageTest/test.jpg'),
        name: "魔杰座",
        music_num: "18",
        creator_name: "小黄人",
        creator_id: 1,

    },
    {
        id: '2',
        cover_path: require('@/assets/img/homepageTest/test.jpg'),
        name: "范特西",
        music_num: "18",
        creator_name: "小黄人",
        creator_id: 1,

    },
    {
        id: '3',
        cover_path: require('@/assets/img/homepageTest/test.jpg'),
        name: "依然范特西",
        music_num: "20",
        creator_name: "小黄人",
        creator_id: 1,

    }
];
const ArtistsRes = [{
        id: '1',
        name: "林俊杰",
        cover_path: require('@/assets/img/homepageTest/test.jpg'),
    },
    {
        id: '2',
        name: "周杰伦",
        cover_path: require('@/assets/img/homepageTest/test.jpg'),
    },
    {
        id: '3',
        name: "陈奕迅",
        cover_path: require('@/assets/img/homepageTest/test.jpg'),
    }
];
const UsersRes = [{
        id: '0',
        avatar_path: require('@/assets/img/homepageTest/icon.jpg'),
        name: "厄加特",
        follow_num: "18",
        fan_num: "20000"
    },
    {
        id: '1',
        avatar_path: require('@/assets/img/homepageTest/icon.jpg'),
        name: "科加斯",
        follow_num: "18",
        fan_num: "20000"
    },
    {
        id: '2',
        avatar_path: require('@/assets/img/homepageTest/icon.jpg'),
        name: "加里奥",
        follow_num: "18",
        fan_num: "20000"
    }
];
export {
    SongsRes,
    PlayListsRes,
    ArtistsRes,
    UsersRes,
}