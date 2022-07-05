<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-arrow />
    <!-- 导航栏 -->
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field placeholder="请输入手机号">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field type="password" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
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
export default {
  methods: {
    onSubmit() {},
  },
}
</script>

<style>
.toutiao {
  font-size: 37px;
}
</style>