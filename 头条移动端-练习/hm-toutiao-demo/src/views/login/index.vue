<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-arrow />
    <!-- 导航栏 -->
    <!-- 表单 -->
    <van-form @submit="onSubmit">
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
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 表单 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    onSubmit() {
      console.log("验证通过，可以提交数据")
    },
  },
}
</script>

<style>
.toutiao {
  font-size: 37px;
}
</style>