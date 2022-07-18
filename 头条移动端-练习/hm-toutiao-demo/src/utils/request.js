import axios from "axios"
// 导入vuex数据
import store from "@/store"
import { Toast } from "vant";
import router from "@/router";
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
}, async function (error) {
    // 处理token过期
    if (error.response && error.response.status === 401) {
        if (store.getters.token) { // 已登录的情况下
            const { refresh_token } = store.state.user
            // 使用刷新token更新token
            try {
                const { data } = await axios({
                    method: "PUT",
                    url: "http://toutiao.itheima.net/v1_0/authorizations",
                    headers: {
                        Authorization: `Bearer ${refresh_token}`
                    }
                })
                // console.log(data.data.token);
                // 保存token
                store.commit("setUser", {
                    token: data.data.token,
                    refresh_token
                })
                // 继续执行上次未完成的请求
                return instance(error.config)
            } catch (error) {
                // 如果报错，就是刷新token也过期了，让用户重新登录
                Toast.fail("请重新登录")
                // router.push("/login")
            }
        } else {
            // 未登录，让用户登录
            Toast.fail("请登录")
            router.push("/login")
            return Promise.reject(error);
        }
    } else {
        // 对响应错误做点什么
        return Promise.reject(error);
    }

});
export default instance