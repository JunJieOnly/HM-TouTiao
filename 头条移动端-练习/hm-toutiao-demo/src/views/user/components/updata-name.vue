<template>
  <div class="updata-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onSuccess"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { upDataUserInfoApi } from "@/api/user"
export default {
  name: "updataName",
  props: {
    userName: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      message: this.userName,
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSuccess() {
      try {
        if (!this.message.length) {
          this.$toast("昵称不能为空")
          return
        }
        await upDataUserInfoApi({
          name: this.message,
        })
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁止背景点击
          duration: 0, // 持续展示
        })
        this.$toast.success("修改昵称成功")
        this.$emit("close")
        this.$emit("update:userName", this.message)
      } catch (error) {
        this.$toast.fail("修改失败")
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>