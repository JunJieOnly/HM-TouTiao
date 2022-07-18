import request from "@/utils/request"
// 获取当前用户自己的信息
export const UserInfoApi = () => request({
    url: "/v1_0/user"
})
// 获取用户个人资料(
export const getUserInfoApi = () => request({
    url: "/v1_0/user/profile",
})
// 编辑用户个人资料
export const upDataUserInfoApi = data => request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data
})
// 编辑用户照片资料
export const upDatePhoto = data => request({
    method: "PATCH",
    url: '/v1_0/user/photo',
    data
})