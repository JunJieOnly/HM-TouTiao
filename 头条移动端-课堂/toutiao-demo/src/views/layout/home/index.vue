<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <!-- 
animated 滑动的动画
border 底边框线
swipeable 开启左右手势滑动
-->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <!-- 使用组件 -->
        <articleList :channel="item" />
      </van-tab>
      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 右侧按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="isEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 内容 -->
      <channel-edit :my-channel="channel" :active-index="active" />
    </van-popup>
  </div>
</template>

<script>
import { getChannelApi } from "@/api/Home"
import articleList from "@/views/layout/home/components/article-list.vue"
import channelEdit from "@/views/layout/home/components/channel-deit.vue"
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      // 1. 定义变量
      channel: null,
      isEditShow: false, // 弹出层是否显示
    }
  },
  computed: {},
  created() {
    // 3. 调用方法
    this.initData()
  },
  methods: {
    // 2. 定义获取数据方法
    async initData() {
      try {
        // 2.1 发送请求
        const { data } = await getChannelApi()
        // 2.2 赋值
        this.channel = data.data.channels
      } catch (error) {
        // 2.3 打印错误
        console.log(error)
      }
    },
  },
  components: {
    articleList,
    channelEdit,
  },
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar {
    background-color: #5094f3;
  }
  .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>