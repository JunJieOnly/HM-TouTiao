<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        commentData.reply_count
          ? commentData.reply_count + '条回复'
          : '暂无数据'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <van-cell title="当前评论项" />
      <Comment-item :comment="commentData" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="评论的回复列表" />
      <CommentList
        type="c"
        :source-id="commentData.com_id"
        :list="commentList"
      />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :art-id="commentData.com_id"
        type="c"
        :aticle-id="aticleId"
        @postSuccess="postSuccess"
      />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue"
import CommentList from "./comment-list.vue"
import CommentPost from "./comment-post.vue"
export default {
  name: "CommentReply",
  props: {
    commentData: {
      type: Object,
      require: true,
    },
  },
  // 接收爷爷发来的值
  inject: ["aticleId"],
  components: { CommentItem, CommentList, CommentPost },
  data() {
    return {
      isPostShow: false, // 发布评论状态
      commentList: [],
    }
  },
  methods: {
    postSuccess(val) {
      // 关闭弹出层
      this.isPostShow = false
      // 视图更新
      this.commentList.unshift(val)
      // 数量加1
      this.commentData.reply_count++
    },
  },
}
</script>

<style scoped lang="less">
.comment-reply {
  .van-nav-bar {
    background-color: #5094f3;
    .van-icon-cross {
      color: #fff;
    }
  }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>