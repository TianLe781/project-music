//导入api
import { reqSongs, reqSongListInfo, reqCheck, reqSongUrl } from '@/api';

const state = {
    songs: [],
    playlist: {
        //防止请求未返回是页面数据更新的报错（提前量）
        creator: {
            avatarUrl: '',
        }
    },
    songUrl: {},
};
const actions = {
    //获取歌单详情
    async songListInfo(context, id) {
        let result = await reqSongListInfo(id);
        if (result.code == 200) {
            context.commit("SONGLISTINFO", result.playlist)
        } else {
            return Promise.reject(new Error('获取歌单详情失败'))
        }
    },
    //获取歌单歌曲
    async songs(context, id) {
        let result = await reqSongs(id);
        if (result.code == 200) {
            context.commit('SONGS', result.songs)
        } else {
            return Promise.reject(new Error('从歌单中获取歌曲失败'))
        }
    },
    //判断歌曲是否可用
    async songCheck(context, id) {
        let result = await reqCheck(id);
        console.log(result);
    },
    //获取歌曲Url
    async songUrl(context, id) {
        let result = await reqSongUrl(id);
        if (result.code == 200) {
            context.commit('SONGURL', result.data[0])
        } else {
            return Promise.reject(new Error('获取歌曲Url失败'))
        }
    }
};
const mutations = {
    //存入歌单歌曲
    SONGS(state, songs) {
        state.songs = songs;
    },
    //存入歌单详情
    SONGLISTINFO(state, playlist) {
        // 防止报错
        state.playlist = playlist;
    },
    //存入歌曲URL
    SONGURL(state, songUrl) {
        state.songUrl = songUrl;
    }
};
const getter = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getter,
}