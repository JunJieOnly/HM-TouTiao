import axios from "axios"
// 导入vuex数据
import store from "@/store"
const instance = axios.create({
    baseURL: "http://toutiao.itheima.net"
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    // 优化token
    const { user } = store.state
    if (user && user.token) { // 判断token是否存在和token是否有值
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance