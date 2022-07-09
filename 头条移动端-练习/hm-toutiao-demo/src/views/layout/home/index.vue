<template>
  <div>
    <!-- 搜索 -->
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
        <!-- /导航栏 -->
        <!-- 频道列表 -->
        <!-- 
animated 滑动的动画
border 底边框线
swipeable 开启左右手势滑动
-->
        <van-tabs
          class="channel-tabs"
          v-model="active"
          swipeable
          animated
          border
        >
          <van-tab :title="item.name" v-for="item in channel" :key="item.id">
            <articleList :channel="item"></articleList>
          </van-tab>

          <!-- 右侧自定义内容 -->
          <!-- 占位元素 -->
          <div slot="nav-right" class="placeholder"></div>
          <!-- 右侧按钮 -->
          <div slot="nav-right" class="hamburger-btn">
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </van-tabs>
        <!-- /频道列表 -->
        <!-- 标签页 -->
      </div>
    </template>
  </div>
</template>
    <!-- 搜索 -->
  </div>
</template>

<script>
import { getUserChannel } from "@/api/home"
import articleList from "@/views/layout/home/components/article-list.vue"
export default {
  name: "home",
  data() {
    return {
      active: 2,
      // 1.定义变量
      channel: null,
    }
  },
  methods: {
    // 2.定义发送请求方法
    async UserInfo() {
      try {
        // 2.1 发送请求
        const { data } = await getUserChannel()
        // 2.2 赋值
        this.channel = data.data.channels
      } catch (error) {
        // 2.3 错误捕捉
        console.log(error)
      }
    },
  },
  // 调用方法
  created() {
    this.UserInfo()
  },
  components: {
    articleList,
  },
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .van-nav-bar {
    background-color: #3296fa;
  }
  .van-button__icon {
    color: #fff;
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