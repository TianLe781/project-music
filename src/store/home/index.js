// 导入api
import { reqBanner, reqSongListHot, reqSongListBoutique } from '@/api'


//home 模块小仓库
const state = {
    bannerList: [],
    playListsHot: [],
    playListsBoutique: [],
};
const actions = {
    //获取banner图
    bannerList(context) {
        //发起请求
        reqBanner().then((value) => {
            //成功
            context.commit('BANNERLIST', value.banners);
        }, (error) => {
            //失败
            return Promise.reject(new Error(error))
        })
    },
    //获取热门歌单
    async songListHot(context) {
        let result = await reqSongListHot();
        if (result.code == 200) {
            //成功
            context.commit('SONGLISTHOT', result.playlists)
        } else {
            //失败
            return Promise.reject(new Error('热门歌单请求失败'))
        }
    },
    //获取精品歌单
    async songListBoutique(context) {
        let result = await reqSongListBoutique();
        if (result.code == 200) {
            context.commit('SONGLISTBOUTIQUE', result.playlists);
        }
    }
};
const mutations = {
    // 存入banner图
    BANNERLIST(store, bannerList) {
        store.bannerList = bannerList;
    },
    // 存入热门歌单
    SONGLISTHOT(store, playListsHot) {
        store.playListsHot = playListsHot
    },
    //存入精品歌单
    SONGLISTBOUTIQUE(store, playListsBoutique) {
        store.playListsBoutique = playListsBoutique;
    }
};
const gtters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    gtters,
}