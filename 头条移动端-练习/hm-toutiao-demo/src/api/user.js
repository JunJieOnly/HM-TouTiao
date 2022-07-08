import request from "@/utils/request"
import store from "@/store"
export const UserInfoApi = () => request({
    url: "/v1_0/user",
    headers: {
        Authorization: `Bearer ${store.getters.token}`

    }
})