import request from "@/utils/request"
// 获取新闻详情
export const getArticleInfoApi = id => request({
    url: "/v1_0/articles/" + id
})
// 关注用户
export const addUserFollowApi = (data) => request({
    method: "POST",
    url: "/v1_0/user/followings",
    data  // target:用户id
})
// 取消关注用户
export const delUserFollowApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/user/followings/" + id,
})
// 收藏文章
export const addCollectArticleApi = (data) => request({
    method: "POST",
    url: "/v1_0/article/collections",
    data  // target:用户id
})
// 取消收藏文章
export const delCollectArticleApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/article/collections/" + id,
})
// 点赞文章
export const addZanArticleApi = (data) => request({
    method: "POST",
    url: "/v1_0/article/likings",
    data  // target:用户id
})
// 取消点赞文章
export const delZanArticleApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/article/likings/" + id,
})