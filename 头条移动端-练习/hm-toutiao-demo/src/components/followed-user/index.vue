<template>
  <van-button
    v-if="isFollowed"
    @click="followFn"
    class="follow-btn"
    round
    :loading="isLoading"
    size="small"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="isLoading"
    size="small"
    icon="plus"
    @click="followFn"
    v-else
    >关注</van-button
  >
</template>

<script>
import { addUserFollowApi, delUserFollowApi } from "@/api/Article"
export default {
  name: "followUser",
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
    async followFn() {
      // 首先判断用户是否登录
      // 未登录直接结束
      if (!this.$store.getters.token) return this.$toast.fail("请登录")
      // 下面执行登录之后的逻辑
      this.isLoading = true
      try {
        if (this.isFollowed) {
          // 关注了，点击取关
          await delUserFollowApi(this.userId)
        } else {
          // 未关注，点击关注
          await addUserFollowApi({
            target: this.userId,
          })
        }
        // 成功提示
        this.$toast.success(this.isFollowed ? "取关成功" : "关注成功")
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