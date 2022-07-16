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
// 获取评论或评论回复
export const getCommentInfoApi = params => request({
    url: "/v1_0/comments",
    /* params: {
        type:   评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: 源id，文章id或评论id
        offset: 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
    } */
    params
})
// 对评论或评论回复点赞
export const addCommentZanApi = id => request({
    url: "/v1_0/comment/likings",
    method: "POST",
    data: {
        target: id
    }
})
// 取消对评论或评论回复点赞
export const delCommentZanApi = id => request({
    url: "/v1_0/comment/likings/" + id,
    method: "DELETE",
})
// 对文章或者评论进行评论
export const addCommentInfoApi = data => request({
    url: "/v1_0/comments",
    method: "POST",
    /* data: {
        target: 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: 评论内容	
        art_id:	文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。	
    } */
    data
})