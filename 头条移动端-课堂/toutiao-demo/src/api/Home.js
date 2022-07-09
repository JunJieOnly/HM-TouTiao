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
