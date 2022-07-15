<template>
  <van-loading type="spinner" v-if="isLoading" :size="24" />
  <van-icon
    v-else
    :color="isFollowed ? '#3296fa' : '#777'"
    :name="isFollowed ? 'star' : 'star-o'"
    @click="collectFn"
  />
</template>

<script>
import { addCollectArticleApi, delCollectArticleApi } from "@/api/Article"
export default {
  name: "collectArticle",
  props: {
    isFollowed: {
      type: Boolean,
      require: true,
    },
    userId: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async collectFn() {
      // 首先判断用户是否登录
      // 未登录直接结束
      if (!this.$store.getters.token) return this.$toast.fail("请登录")
      // 下面执行登录之后的逻辑
      this.isLoading = true
      try {
        if (this.isFollowed) {
          // 收藏了，点击取消
          await delCollectArticleApi(this.userId)
        } else {
          // 未收藏，点击收藏
          await addCollectArticleApi({
            target: this.userId,
          })
        }
        // 成功提示
        this.$toast.success(this.isFollowed ? "取消成功" : "收藏成功")
        // 更新视图
        this.$emit("update:isFollowed", !this.isFollowed)
      } catch (error) {
        this.$toast.fail("操作失败")
        console.log(error)
      }
      this.isLoading = false
    },
  },
}
</script>

<style>
</style>