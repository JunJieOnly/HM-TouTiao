<template>
  <div id="app">
    <h1>黑马头条</h1>
    <i class="toutiao toutiiao-shoucang"></i>
    <div class="box"></div>
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