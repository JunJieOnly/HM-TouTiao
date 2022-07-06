import request from "@/utils/request"
// 发送验证码接口
export const GetSmsApi = data => request({
    url: `/v1_0/sms/codes/${data}`
})
// 登录接口,data接收的是一个对象
export const userLoginApi = data => request({
    method: "POST",
    url: "/v1_0/authorizations",
    data
})