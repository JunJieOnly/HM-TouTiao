<template>
  <div id="app">
    <!-- 一级路由 -->
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