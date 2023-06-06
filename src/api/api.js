import {get, post } from './http.js'

//主页部分
export const getAllPlaylists = () => get(`/page/get_all_music_list/`);
export const getAllSingers = () => get(`/page/get_all_singer/`);
export const getAllSongs = () => get(`/page/get_all_music/`);
//热歌
export const getRankList1 = () => get(`/page/get_hot_music_rank/`);
//新歌
export const getRankList2 = () => get(`/page/get_new_music_rank/`);
//飙升
export const getRankList3 = () => get(`/page/get_surge_music_rank/`);
//原创
export const getRankList4 = () => get(`/page/get_original_music_rank/`);

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
export const setLikes = (formdata) => post(`/user/like_or_unlike_music/`, formdata);
//收藏歌曲
export const setFavorites = (formdata) => post(`/user/mark_music/`, formdata);
//分享歌单/歌曲
export const setPosts = (formdata) => post(`/message/cre_post/`, formdata);
//发送消息
export const setMessages = (formdata) => post(``, formdata);

//获取创建的收藏夹
export const getFavorites = function() {
    let JWT = JSON.parse(localStorage.getItem("loginInfo")).JWT
    return get(`/user/get_create_music_list/?JWT=${JWT}`);
}

export const createList = (formdata)=> post(`/user/create_favorites/`, formdata);
export const deleteList = (formdata) => post(`/user/del_favorites/`, formdata);
export const setPublic = (formdata) => post(`/user/share_favorites/`, formdata);
export const delFromList = (formdata) => post(`/user/unmark_music/`, formdata);
export const changeMusiclist = (formdata) => post(`/music/change_favorites_info/`, formdata);

export const complainMusic = (formdata) => post(`/message/cre_complain/`, formdata);