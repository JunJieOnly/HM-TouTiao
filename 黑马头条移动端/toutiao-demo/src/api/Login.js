import request from "@/utils/request"
// 发送验证码接口
export const sendSmsApi = mobile => request({
    // 这里mobile不是死数据，所以使用模板字符串
    url: `/v1_0/sms/codes/${mobile}`
})
// 登录接口
export const userLogin = data => request({
    method: "POST",
    url: "/v1_0/authorizations",
    data
})