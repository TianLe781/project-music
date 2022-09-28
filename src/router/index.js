import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由
Vue.use(VueRouter);

//引入路由文件
import routes from './routes'

//解决编程式组件重复点击时出现的报错
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push/replace
//第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call/apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文(this）一次‘
//不同点：call/apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}



let router = new VueRouter({
    routes,
    mode: 'history',
    //调整路由跳转时滚动条的位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});
//对外暴露
export default router