import request from "@/utils/request"
export const userSearchSuggestionApi = params => request({
    url: "/v1_0/suggestion",
    params
})