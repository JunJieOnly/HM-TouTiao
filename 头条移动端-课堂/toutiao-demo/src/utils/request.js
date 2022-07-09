import axios from "axios"
// 引入store
import store from "@/store"
// 配置根域名
const instance = axios.create({
    baseURL: "http://toutiao.itheima.net"
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = store.getters.token
    // 如果token存在就自动添加token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么，接口获取到的数据取决响应拦截器的返回值
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// 导出
export default instance