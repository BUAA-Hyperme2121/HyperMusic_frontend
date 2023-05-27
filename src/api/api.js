import {get, post } from './http.js'

//主页部分
export const getAllPlaylists = () => get(`http://127.0.0.1:4523/m2/2449235-0-default/84000213`);
export const getAllSingers = () => get(`/page/get_all_singer/`);
export const getAllSongs = () => get(`/page/get_all_music/`);
//热歌
export const getRankList1 = () => get(`http://127.0.0.1:4523/m2/2449235-0-default/84003895`);
//新歌
export const getRankList2 = () => get(`http://127.0.0.1:4523/m2/2449235-0-default/84003987`);
//飙升
export const getRankList3 = () => get(`http://127.0.0.1:4523/m2/2449235-0-default/84005095`);
//原创
export const getRankList4 = () => get(`http://127.0.0.1:4523/m2/2449235-0-default/84005441`);

//搜索部分
export const getSongRes = (keywords) => get(`/index/music_search/?keywords=${keywords}`);
export const getPlaylistRes = (keywords) => get(`/index/musiclist_search/?keywords=${keywords}`);
export const getSingerRes = (keywords) => get(`/index/singer_search/?keywords=${keywords}`);
export const getUserRes = (keywords) => get(`/index/user_search/?keywords=${keywords}`);


//歌曲部分（上传、播放、喜欢、添加到歌单等等
//播放歌曲
export const playSong = (formdata) => post(`/user/play_music/`, formdata);
//上传歌曲
export const uploadSong = (formdata) => post(`/user/upload_music/`, formdata);
//喜欢歌曲
export const setLikes = (formdata) => post(``, formdata);
//收藏歌曲
export const setFavorites = (formdata) => post(``, formdata);
//分享歌单/歌曲
export const setPosts = (formdata) => post(``, formdata);
//发送消息
export const setMessages = (formdata) => post(``, formdata);

//获取创建的收藏夹
export const getFavorites = function() {
    let JWT = JSON.parse(localStorage.getItem("loginInfo")).JWT
    return get(`http://127.0.0.1:4523/m2/2449235-0-default/79837266?JWT=${JWT}`);
}