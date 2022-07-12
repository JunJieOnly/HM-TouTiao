import reques from "@/utils/request"
// 获取用户频道
export const getUserChannel = () => reques({
    url: "/v1_0/user/channels"
})
// 获取推荐新闻
export const getrAticlesList = params => reques({
    url: "/v1_0/articles",
    params
})
// 获取所有频道数据
export const getAllChannelApi = () => reques({
    url: "/v1_0/channels",
})
// 添加用户指定的频道
export const addUserChannelApi = data => reques({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data
})
// 删除用户指定的频道
export const delUserChannelApi = id => reques({
    method: "DELETE",
    url: "/v1_0/user/channels/" + id
})