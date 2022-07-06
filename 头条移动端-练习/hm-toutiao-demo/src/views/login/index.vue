<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 导航栏 -->
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        type="Number"
        icon-prefix="toutiao"
        left-icon="shouji"
        maxlength="11"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="user.code"
        type="Number"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #button>
          <van-button
            v-if="isShow"
            size="small"
            type="primary"
            native-type="button"
            ><van-count-down :time="5000" format="ss 秒" @change="changeFn"
          /></van-button>
          <van-button
            v-else
            size="small"
            type="primary"
            native-type="button"
            @click="sendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 表单 -->
  </div>
</template>

<script>
import { GetSmsApi, userLoginApi } from "@/api/Login"
export default {
  data() {
    return {
      isShow: false,
      user: {
        mobile: "",
        code: "",
      },
      rules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3|4|5|6|7|8|9|]\d{9}$/, message: "手机号格式不正确" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /\d{6}$/, message: "验证码格式不正确" },
        ],
      },
    }
  },
  methods: {
    // 登录提交
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      })
      try {
        await userLoginApi(this.user)
      } catch (error) {
        const { response } = error
        this.$toast.fail(response.data)
        return
      }
      this.$toast.clear()
    },
    // 发送验证码
    async sendSms() {
      // 点击发送验证码之前要校验手机号输入是否规范
      try {
        await this.$refs.form.validate("mobile")
      } catch (error) {
        const { message } = error
        this.$toast.fail(message)
        return
      }
      // 校验通过触发
      this.isShow = true
      // 发送验证码请求
      try {
        await GetSmsApi(this.user.mobile)
        this.$toast.success("发送成功")
      } catch (error) {
        this.$toast.fail("请求失败")
      }
    },
    // 倒计时变化触发函数
    changeFn(time) {
      const { seconds } = time
      if (seconds === 0) {
        this.isShow = false
      }
    },
  },
}
</script>

<style lang=less scoped>
/deep/.van-nav-bar__content {
  background-color: #3296fa;
  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}
/deep/.van-count-down {
  color: #fff;
}
</style>