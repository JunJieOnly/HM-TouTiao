import request from "@/utils/request"
// 获取用户频道接口
export const getChannelApi = () => request({
    url: "/v1_0/user/channels",
})
// 获取频道对应数据
export const getArticleListApi = params => request({
    url: "/v1_0/articles",
    params
})
// 获取全部频道数据
export const getAllChannelApi = () => request({
    url: "/v1_0/channels",
})
// 添加用户频道
export const addUserChannelApi = data => request({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data
})
// 删除用户指定频道
export const delUserChannelApi = id => request({
    url: "/v1_0/user/channels/" + id,
    method: "DELETE"
})

