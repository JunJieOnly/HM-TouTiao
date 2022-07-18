<template>
  <van-loading type="spinner" v-if="isloading" size="24px" />
  <van-icon
    v-else
    :color="value ? '#5094f3' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="collectHandler"
  />
</template>

<script>
import { addCollectAarticleApi, delCollectAarticleApi } from "@/api/Article"
export default {
  name: "collectArticle",
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    articleId: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      isloading: false,
    }
  },
  methods: {
    async collectHandler() {
      //判断是否登录
      if (!this.$store.getters.token) return this.$toast.fail("请登录")
      this.isloading = true
      try {
        // 已登录
        if (this.value) {
          // 已收藏，要取消
          await delCollectAarticleApi(this.articleId)
        } else {
          // 未收藏，点击收藏
          await addCollectAarticleApi({
            target: this.articleId,
          })
        }
        // 提示更新
        this.$toast.success(this.value ? "取消成功" : "收藏成功")
        // 视图更新
        this.$emit("input", !this.value)
      } catch (error) {
        this.$toast.fail("操作失败")
        console.log(error)
      }
      this.isloading = false
    },
  },
}
</script>

<style>
</style>