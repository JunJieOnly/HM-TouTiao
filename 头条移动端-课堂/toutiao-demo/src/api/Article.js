import request from "@/utils/request"
// 获取新闻详情
export const getArticleInfoApi = id => request({
    url: "/v1_0/articles/" + id
})
// 关注用户
export const addUserFollowingApi = data => request({
    method: "POST",
    url: "/v1_0/user/followings",
    data
})
// 取消关注用户
export const delUserFollowingApi = id => request({
    method: "DELETE",
    url: "/v1_0/user/followings/" + id,
})
// 收藏文章
export const addCollectAarticleApi = data => request({
    method: "POST",
    url: "/v1_0/article/collections",
    data
})
// 取消收藏文章
export const delCollectAarticleApi = id => request({
    method: "DELETE",
    url: "/v1_0/article/collections/" + id,
})
// 点赞文章
export const addZanAarticleApi = data => request({
    method: "POST",
    url: "/v1_0/article/likings",
    data
})
// 取消点赞文章
export const delZanAarticleApi = id => request({
    method: "DELETE",
    url: "/v1_0/article/likings/" + id,
})