<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />

    <van-button
      class="post-btn"
      :disabled="message.length === 0"
      @click="submit"
      >发布</van-button
    >
  </div>
</template>

<script>
// 发布文章接口
import { addCommentInfoApi } from "@/api/Article"
export default {
  name: "CommentPost",
  props: {
    articleId: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      message: "",
    }
  },
  methods: {
    async submit() {
      // 判断是否登录
      if (!this.$store.getters.token)
        return this.$toast.fail("请登录之后再操作")
      // 请求接口
      try {
        const { data } = await addCommentInfoApi({
          target: this.articleId, // 当前文章的Id
          content: this.message, // 输入框的内容
          art_id: null, // 对该文章评论不用写值
        })
        if (data.message === "OK") {
          // 发布成功
          this.$toast.success("发布成功")
        } else {
          this.$toast.fail("发布失败")
        }
        const { new_obj } = data.data
        // 更新视图
        this.$emit("addComment", new_obj)
        // 清空输入框
        this.message = ""
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {},
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>