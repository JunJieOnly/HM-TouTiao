import request from "@/utils/request"

export const getChannelApi = params => request({
    url: "/v1_0/channels",
    params
})
