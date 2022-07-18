<template>
  <van-button
    @click="followClick"
    class="follow-btn"
    round
    :loading="isloading"
    size="small"
    v-if="value"
    >已关注</van-button
  >
  <van-button
    @click="followClick"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="isloading"
    size="small"
    icon="plus"
    v-else
    >关注</van-button
  >
</template>

<script>
import { addUserFollowingApi, delUserFollowingApi } from "@/api/Article"
export default {
  name: "userFollow",
  props: {
    // 关注状态
    value: {
      type: Boolean,
      require: true,
    },
    // 用户id
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
    // 点击关注
    async followClick() {
      //判断是否登录
      if (!this.$store.getters.token) return this.$toast.fail("请登录")
      this.isloading = true
      try {
        // 已登录
        if (this.value) {
          // 已关注，要取消
          await delUserFollowingApi(this.articleId)
        } else {
          // 未关注，点击关注
          await addUserFollowingApi({
            target: this.articleId,
          })
        }
        // 提示更新
        this.$toast.success(this.value ? "取关成功" : "关注成功")
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