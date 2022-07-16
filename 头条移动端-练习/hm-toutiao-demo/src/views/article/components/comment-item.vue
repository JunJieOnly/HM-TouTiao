<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="likeStatus ? 'good-job' : 'good-job-o'"
        @click="addZanFn"
        >赞 ({{ comment.like_count }})</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentZanApi, delCommentZanApi } from "@/api/Article"
export default {
  name: "CommentItem",
  props: {
    //每行的评论信息
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 评论的ID
      target: this.comment.com_id,
      //   点赞的状态
      likeStatus: this.comment.is_liking,
    }
  },
  methods: {
    // 点赞
    async addZanFn() {
      // 判断是否登录
      if (!this.$store.getters.token)
        return this.$toast.fail("请登录之后再操作")
      try {
        // 判断点赞处于什么状态
        if (this.likeStatus) {
          // 已点赞,点击取消
          await delCommentZanApi(this.target)
          this.comment.like_count--
        } else {
          // 没点赞,点击点赞
          await addCommentZanApi(this.target)
          this.comment.like_count++
        }
        // 操作提示
        this.$toast.success(this.likeStatus ? "取消成功" : "点赞成功")
        // 更新视图
        this.likeStatus = !this.likeStatus
      } catch (error) {
        this.$toast.fail("操作失败,请稍后重试")
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .liked {
    background-color: orange;
  }
}
</style>