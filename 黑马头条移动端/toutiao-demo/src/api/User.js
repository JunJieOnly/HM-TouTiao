import request from "@/utils/request"
//  获取用户信息请求
export const getUserProInfo = () => request({
    url: "/v1_0/user",
})
// 获取用户个人资料
export const getUserInfo = () => request({
    url: '/v1_0/user/profile'
})
// 修改用户资料
export const upDataUserInfo = data => request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data
})
// 编辑用户照片资料（头像、身份证照片）
export const upDataUserPhoto = data => request({
    method: "PATCH",
    url: '/v1_0/user/photo',
    data
})