<template>
  <div>
    <van-picker
      title="选择性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="genderIndex"
    />
  </div>
</template>

<script>
import { upDataUserInfo } from "@/api/User"
export default {
  name: "upDateSex",
  props: {
    genderIndex: {
      type: [String, Number],
      default: 0, // 默认选中索引
    },
  },
  data() {
    return {
      columns: ["男", "女"],
    }
  },
  methods: {
    async onConfirm(value, index) {
      //   console.log(`当前值：${value}, 当前索引：${index}`)
      try {
        await upDataUserInfo({
          gender: index,
        })
        // 关闭弹框
        this.$emit("close")
        // 更新视图
        this.$emit("update:genderIndex", index)
      } catch (error) {
        this.$toast.fail("更新失败")
        console.log(error)
      }
    },
  },
}
</script>

<style>
</style>