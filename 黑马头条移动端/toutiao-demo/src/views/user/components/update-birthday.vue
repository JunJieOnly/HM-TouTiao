<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择出生年月"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { upDataUserInfo } from "@/api/User"
import dayjs from "@/utils/day"
export default {
  name: "upDateBirthday",
  props: {
    birthday: {
      // 用户传入的值
      type: String,
      require: true,
    },
  },
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.birthday), //默认显示用户传入的值
    }
  },
  methods: {
    async onConfirm(val) {
      //   console.log(val) // 当前选中的事时间
      const birthday = dayjs(val).format("YYYY-MM-DD")
      //   console.log(birthday) // 处理后的时间
      try {
        await upDataUserInfo({
          birthday: birthday,
        })
        // 关闭弹框
        this.$emit("close")
        // 更新视图
        this.$emit("update:birthday", birthday)
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