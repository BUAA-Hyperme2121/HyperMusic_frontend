const song = {
    state: {
        isPlay: false, // 播放状态
        id: null, // 音乐ID
        url: '', // 歌曲URL
        duration: 0, //  音乐时长
        curTime: 0, // 当前音乐的播放位置
        changeTime: 0, //  指定播放时刻
        title: '', //  歌名
        artist: '', //  歌手名
        picUrl: '', // 歌曲图片
        autoNext: true, // 用于触发自动播放下一首
        listOfSongs: [], // 当前播放列表
        tempList: {}, // 单个歌单信息
        lyric: [], // 歌词数据
        volume: 100
    },
    getters: {
        isPlay: state => state.isPlay,
        id: state => {
            let id = state.id
            if (!id) {
                id = JSON.parse(window.localStorage.getItem('id') || null)
            }
            return id
        },
        url: state => {
            let url = state.url
            if (!url) {
                url = JSON.parse(window.localStorage.getItem('url') || null)
            }
            return url
        },
        duration: state => {
            let duration = state.duration
            if (!duration) {
                duration = JSON.parse(window.localStorage.getItem('duration') || 0)
            }
            return duration
        },
        curTime: state => {
            let curTime = state.curTime
            if (!curTime) {
                curTime = JSON.parse(window.localStorage.getItem('curTime') || 0)
            }
            return curTime
        },
        changeTime: state => {
            let changeTime = state.changeTime
            if (!changeTime) {
                changeTime = JSON.parse(window.localStorage.getItem('changeTime') || 0)
            }
            return changeTime
        },
        title: state => {
            let title = state.title
            if (!title) {
                title = JSON.parse(window.localStorage.getItem('title')) || "暂无歌曲"
            }
            return title
        },
        artist: state => {
            let artist = state.artist
            if (!artist) {
                artist = JSON.parse(window.localStorage.getItem('artist') || null)
            }
            return artist
        },
        picUrl: state => {
            let picUrl = state.picUrl
            if (!picUrl) {
                picUrl = JSON.parse(window.localStorage.getItem('picUrl')) || require("@/assets/img/homepageTest/icon.jpg")
            }
            return picUrl
        },
        autoNext: state => {
            let autoNext = state.autoNext
            if (!autoNext) {
                autoNext = JSON.parse(window.localStorage.getItem('autoNext') || null)
            }
            return autoNext
        },
        tempList: state => {
            let tempList = state.tempList
            if (JSON.stringify(tempList) === '{}') {
                tempList = JSON.parse(window.localStorage.getItem('tempList') || null)
            }
            return tempList
        },
        listOfSongs: state => {
            let listOfSongs = state.listOfSongs
            if (!listOfSongs.length) {
                listOfSongs = JSON.parse(window.localStorage.getItem('listOfSongs') || null)
            }
            return listOfSongs
        },
        volume: state => {
            let volume = state.volume
            if (!volume) {
                volume = JSON.parse(window.localStorage.getItem('volume') || null)
            }
            return volume
        },
        lyric: state => {
            let lyric = state.lyric
            if (lyric.length === 0) {
                lyric = JSON.parse(window.sessionStorage.getItem('lyric') || null)
            }
            return lyric
        },

    },
    mutations: {
        setIsPlay: (state, isPlay) => {
            state.isPlay = isPlay
        },
        setId: (state, id) => {
            state.id = id
            window.localStorage.setItem('id', JSON.stringify(id))
        },
        setUrl: (state, url) => {
            state.url = url
            window.localStorage.setItem('url', JSON.stringify(url))
        },
        setDuration: (state, duration) => {
            state.duration = duration
            window.localStorage.setItem('duration', JSON.stringify(duration))
        },
        setCurTime: (state, curTime) => {
            state.curTime = curTime
            window.localStorage.setItem('curTime', JSON.stringify(curTime))
        },
        setChangeTime: (state, changeTime) => {
            state.changeTime = changeTime
            window.localStorage.setItem('changeTime', JSON.stringify(changeTime))
        },
        setTitle: (state, title) => {
            state.title = title
            window.localStorage.setItem('title', JSON.stringify(title))
        },
        setArtist: (state, artist) => {
            state.artist = artist
            window.localStorage.setItem('artist', JSON.stringify(artist))
        },
        setPicUrl: (state, picUrl) => {
            state.picUrl = picUrl
            window.localStorage.setItem('picUrl', JSON.stringify(picUrl))
        },
        setAutoNext: (state, autoNext) => {
            state.autoNext = autoNext
            window.localStorage.setItem('autoNext', JSON.stringify(autoNext))
        },
        setTempList: (state, tempList) => {
            state.tempList = tempList
            window.localStorage.setItem('tempList', JSON.stringify(tempList))
        },
        setListOfSongs: (state, listOfSongs) => {
            state.listOfSongs = listOfSongs
            window.localStorage.setItem('listOfSongs', JSON.stringify(listOfSongs))
        },
        setVolume: (state, volume) => {
            state.volume = volume
            window.localStorage.setItem('volume', JSON.stringify(volume))
        },
        //用于toplay中立刻播放
        playListOfSongs: (state, song) => {
            var index = -1;
            var length = state.listOfSongs.length;
            for (var i = 0; i < length; i++) {
                if (song.id == state.listOfSongs[i].id) {
                    index = i;
                }
            }
            if (index == -1) {
                state.listOfSongs.push(song);
            }
            window.localStorage.setItem('listOfSongs', JSON.stringify(state.listOfSongs))
        },
        //加入播放列表末尾时
        addListOfSongs: (state, song) => {
            var index = -1;
            var length = state.listOfSongs.length;
            for (var i = 0; i < length; i++) {
                if (song.id == state.listOfSongs[i].id) {
                    index = i;
                }
            }
            if (index == -1) {
                state.listOfSongs.push(song);
            } else {
                state.listOfSongs.splice(index, 1);
                state.listOfSongs.push(song);
            }
            window.localStorage.setItem('listOfSongs', JSON.stringify(state.listOfSongs))
        },
        deleteListOfSongs: (state, song) => {
            var index = -1;
            var length = state.listOfSongs.length;
            for (var i = 0; i < length; i++) {
                if (song.id == state.listOfSongs[i].id) {
                    index = i;
                }
            }
            if (index != -1) {
                state.listOfSongs.splice(index, 1);
            }
            window.localStorage.setItem('listOfSongs', JSON.stringify(state.listOfSongs))
        },
        deleteAll: (state) => {
            state.listOfSongs.splice(0, state.listOfSongs.length)
            window.localStorage.setItem('listOfSongs', JSON.stringify(state.listOfSongs))
        },
        setLyric: (state, lyric) => {
            state.lyric = lyric
            window.sessionStorage.setItem('lyric', JSON.stringify(lyric))
        },
    },
    actions: {}
}

export default song