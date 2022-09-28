import axios from 'axios';


//创建axios
const requests = axios.create({
    // baseURL: '/api',
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
        return config;
    })
    //响应拦截器
requests.interceptors.response.use((res) => {
    //响应成功回调函数
    return res.data;

}, (error) => {
    // 响应失败回调函数
    return Promise.reject(new Error('请求失败：请检查接口地址是否有误！', error))
})


export default requests;