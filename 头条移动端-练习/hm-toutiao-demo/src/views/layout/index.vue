<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon-prefix="toutiao" replace to="/home" icon="shouye"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon-prefix="toutiao" replace to="/qa" icon="wenda"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon-prefix="toutiao" replace to="/video" icon="shipin"
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon-prefix="toutiao" replace to="/my" icon="wode">
        {{ token ? "我的" : "未登录" }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Layout",
  computed: {
    ...mapGetters(["token"]),
  },
}
</script>

<style>
</style>