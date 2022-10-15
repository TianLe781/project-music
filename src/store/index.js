import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//导入小仓库
import home from './home';
import playlistinfo from './playlistinfo';
import fullScreen from './fullScreen';

export default new Vuex.Store({
    modules: {
        home,
        playlistinfo,
        fullScreen,
    }
})