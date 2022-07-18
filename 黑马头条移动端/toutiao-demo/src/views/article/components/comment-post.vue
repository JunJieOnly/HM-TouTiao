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
import { addCommentInfoApi } from "@/api/Article"
export default {
  name: "CommentPost",
  props: {
    artId: {
      type: [String, Number],
      require: true,
    },
    aticleId: {
      type: [String, Number],
      require: true,
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      message: "",
    }
  },
  methods: {
    async submit() {
      //   判断是否登录
      if (!this.$store.getters.token) return this.$toast.fail("请登录")
      try {
        const { data } = await addCommentInfoApi({
          target: this.artId,
          content: this.message, // 要发布的内容
          art_id: this.type === "a" ? null : this.aticleId,
        })
        //  成功提示
        this.$toast.success("发布成功")
        // 输入框清空
        ;(this.success = ""),
          // 视图更新
          this.$emit("postSuccess", data.data.new_obj)
      } catch (error) {
        this.$toast.fail("发布失败")
        console.log(error)
      }
    },
  },
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
