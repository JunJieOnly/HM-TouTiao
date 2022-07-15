<template>
  <van-loading type="spinner" v-if="isloading" size="24px" />
  <van-icon
    v-else
    :color="isAttitude === 1 ? '#5094f3' : '#777'"
    :name="isAttitude === 1 ? 'good-job' : 'good-job-o'"
    @click="zanHandler"
  />
</template>

<script>
import { addZanAarticleApi, delZanAarticleApi } from "@/api/Article"
export default {
  name: "zanArticle",
  props: {
    isAttitude: {
      type: Number,
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
    async zanHandler() {
      //判断是否登录
      if (!this.$store.getters.token) return this.$toast.fail("请登录")
      this.isloading = true
      try {
        // 已登录
        if (this.isAttitude === 1) {
          // 已点赞，要取消
          await delZanAarticleApi(this.articleId)
        } else {
          // 未点赞，则点赞
          await addZanAarticleApi({
            target: this.articleId,
          })
        }
        // 提示更新
        this.$toast.success(this.isAttitude === 1 ? "取消成功" : "点赞成功")
        // 视图更新
        const newAttitude = this.isAttitude === 1 ? 0 : 1
        this.$emit("update:isAttitude", newAttitude)
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