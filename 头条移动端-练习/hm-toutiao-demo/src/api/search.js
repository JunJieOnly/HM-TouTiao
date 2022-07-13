import request from "@/utils/request"
// 获取搜索建议
export const userSearchSuggestionApi = params => request({
    url: "/v1_0/suggestion",
    params
})
// 获取搜索结果
export const getSearchResult = params => request({
    url: "/v1_0/search",
    params
})