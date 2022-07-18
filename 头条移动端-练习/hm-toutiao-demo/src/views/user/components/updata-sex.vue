<template>
  <div>
    <van-picker
      title="选择性别"
      show-toolbar
      :columns="columns"
      :default-index="userSex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { upDataUserInfoApi } from "@/api/user"
export default {
  name: "updataSex",
  props: {
    userSex: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
    }
  },
  methods: {
    async onConfirm(value, index) {
      try {
        await upDataUserInfoApi({
          gender: index,
        })
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁止背景点击
          duration: 0, // 持续展示
        })
        this.$toast.success("更改成功")
        this.$emit("close")
        this.$emit("update:userSex", index)
      } catch (error) {
        this.$toast.fail("修改失败")
        console.log(error)
      }
    },
  },
}
</script>

<style>
</style>