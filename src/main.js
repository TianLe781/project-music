import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'

//引入API
import * as API from '@/api';
// 导入Vuex
import store from '@/store';
Vue.config.productionTip = false;
//全局组件
import Header from '@/components/Header'
Vue.component(Header.name, Header);
import AsideLeft from '@/components/AsideLeft'
Vue.component(AsideLeft.name, AsideLeft);
import PalyBar from '@/components/PalyBar'
Vue.component(PalyBar.name, PalyBar);
import Footer from '@/components/Footer'
Vue.component(Footer.name, Footer)
import Modalbox from '@/components/Modalbox'
Vue.component(Modalbox.name, Modalbox)
    //Swiper
import 'swiper/css/swiper.css'
//引入自定义指令
import '@/directives/autofocus'

new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    router,
    store,
}).$mount('#app')