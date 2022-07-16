<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <!-- 点击关闭弹出层 -->
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <van-cell>
        <template #title>当前评论项: </template>
      </van-cell>
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->
      <van-cell>
        <template #title>回复列表: </template>
      </van-cell>
      <!-- 评论的回复列表 -->
      <comment-list type="c" :sourceId="comment.com_id" :list="commentList" />
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
      <comment-post
        @addComment="addComment"
        :articleId="comment.com_id"
        :art_id="articleId"
        type="c"
      />
    </van-popup>

    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item"
import CommentList from "./comment-list.vue"
import CommentPost from "./comment-post.vue"
export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    // 点击回复的那行评论信息
    comment: {
      type: Object,
      required: true,
    },
  },
  //   接收爷组件传来的文章ID
  inject: ["articleId"],
  data() {
    return {
      isPostShow: false, // 控制回复评论的弹出框
      commentList: [], // 与list实现数据共享
    }
  },
  methods: {
    // 接收post组件抛出来的事件,然后进行后续操作
    addComment(val) {
      // 更新视图(手动添加数据)
      this.commentList.unshift(val)
      //   关闭弹出层
      this.isPostShow = false
      //   数据总条数++
      this.comment.reply_count++
    },
  },
}
</script>

<style scoped lang="less">
.comment-reply {
  .van-nav-bar {
    background-color: #3296fa;
    /deep/.van-nav-bar__title,
    /deep/.van-icon-cross {
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