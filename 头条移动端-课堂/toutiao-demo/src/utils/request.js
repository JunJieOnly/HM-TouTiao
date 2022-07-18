import axios from "axios"
// 引入store
import store from "@/store"
import router from "@/router/index"
import { Toast } from "vant"
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
}, async function (error) {
    // 对响应错误做点什么 ，状态码不是2XX就会走到这里
    if (error.response && error.response.status === 401) {
        // 如果只有一个token，只能让用户重新登录
        // 发生了401状态码会走到这里
        // 短token过期了，登录才能换
        if (store.getters.token) {
            //用refresh_token重新换一个新的token过来 
            // 先获取refresh_token
            const { refresh_token } = store.state.user
            try {
                let { data } = await axios({
                    method: "PUT",
                    url: "http://toutiao.itheima.net/v1_0/authorizations",
                    headers: {
                        Authorization: `Bearer ${refresh_token}`
                    }
                })
                // 重新保存返回新的token
                store.commit("setUser", { token: data.data.token, refresh_token })
                // 继续上一次的请求(固定格式)
                return instance(error.config)
            } catch (error) {
                //    如果请求token也出错，说明refresh_token也过期了，只能重新登录
                Toast.fail("请登录") // 提示
                router.push("/login") // 跳转
            }
        } else {
            // 没有token,让用户登录,如果存在路由守卫基本不可能走到这一步
            Toast.fail("请登录") // 提示
            router.push("/login") // 跳转
            return Promise.reject(error); // 抛出错误
        }
    } else {
        return Promise.reject(error);
    }
});
// 导出
export default instance