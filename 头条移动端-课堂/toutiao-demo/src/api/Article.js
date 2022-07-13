import request from "@/utils/request"
// 获取新闻详情
export const getArticleInfoApi = id => request({
    url: "/v1_0/articles/" + id
})