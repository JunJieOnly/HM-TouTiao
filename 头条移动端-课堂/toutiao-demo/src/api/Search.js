import request from "@/utils/request"
export const getSearchSuggestionApi = params => request({
    // 第一种方法,直接传入值
    // url: `/v1_0/suggestion?q=${params}`
    // 第二种方法,需要传入键值对
    url: "/v1_0/suggestion",
    params
})