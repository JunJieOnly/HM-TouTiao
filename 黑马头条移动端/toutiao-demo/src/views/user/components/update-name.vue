<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="submit"
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
import { upDataUserInfo } from "@/api/User"
export default {
  name: "UpdateName",
  props: {
    userName: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      message: this.userName,
    }
  },
  created() {},
  methods: {
    async submit() {
      // 判断昵称是否为空
      if (this.message.length === 0) return this.$toast.fail("昵称不能为空")
      //   发送请求
      try {
        await upDataUserInfo({
          name: this.message,
        })
        // 关闭弹框
        this.$emit("close")
        // 更新视图（把更新完成之后的数据再抛给父级）
        this.$emit("update:userName", this.message)
      } catch (error) {
        this.$toast.fail("更新失败")
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
