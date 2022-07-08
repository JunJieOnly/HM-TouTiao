import request from "@/utils/request"
// 导入仓库
import store from "@/store"
//  获取用户信息请求
export const getUserProInfo = () => request({
    url: "/v1_0/user",
    headers: {
        Authorization: `Bearer ${store.getters.token}`
    }
})