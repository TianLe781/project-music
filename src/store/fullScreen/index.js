import { reqSongLyric } from '@/api'

const state = {
    lrcs: '',
};
const actions = {
    async songLyric(context, id) {
        let result = await reqSongLyric(id);
        if (result.code == 200) {
            context.commit('SONGLYRIC', result.lrc.lyric);
        } else {
            return Promise.reject(new Error('获取歌词失败'))
        }
    }
};
const mutations = {
    SONGLYRIC(state, lyric) {
        state.lrcs = lyric;
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