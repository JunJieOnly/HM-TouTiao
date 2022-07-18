<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择生日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="onSuccess"
  />
</template>

<script>
import { upDataUserInfoApi } from "@/api/user"
import dayjs from "@/utils/day"
export default {
  name: "updataBirthday",
  props: {
    userBirthday: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.userBirthday),
    }
  },
  methods: {
    async onSuccess(val) {
      const birthday = dayjs(val).format("YYYY-MM-DD")
      try {
        await upDataUserInfoApi({
          birthday,
        })
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁止背景点击
          duration: 0, // 持续展示
        })
        this.$toast.success("修改生日成功")
        this.$emit("close")
        this.$emit("update:userBirthday", birthday)
      } catch (error) {
        console.log("修改失败")
        console.log(error)
      }
    },
  },
}
</script>

<style>
</style>