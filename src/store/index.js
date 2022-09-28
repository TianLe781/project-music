import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//导入小仓库
import home from './home';
import playlistinfo from './playlistinfo';

export default new Vuex.Store({
    modules: {
        home,
        playlistinfo,
    }
})