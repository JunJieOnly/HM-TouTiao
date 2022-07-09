import request from "@/utils/request"
//  获取用户信息请求
export const getUserProInfo = () => request({
    url: "/v1_0/user",
})