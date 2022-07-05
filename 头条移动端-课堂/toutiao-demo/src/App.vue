<template>
  <div id="app">
    <h1>黑马头条</h1>
    <i class="toutiao toutiiao-shoucang"></i>
    <div class="box"></div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style scoped lang="less">
.box {
  height: 100px;
  width: 100px;
  background-color: red;
}
</style>