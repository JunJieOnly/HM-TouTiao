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
          <div
            slot="nav-right"
            class="hamburger-btn"
            @click="isEditShow = true"
          >
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </van-tabs>
        <!-- /频道列表 -->
        <!-- 标签页 -->
      </div>
    </template>
    <!-- 弹出层 -->
    <van-popup
      v-model="isEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 内容 -->
      <channelEdit
        :new-channel="channel"
        :active-index="active"
        @changetab="changetab"
        @changeLeft="changeLeft"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from "@/api/home"
import articleList from "@/views/layout/home/components/article-list.vue"
import channelEdit from "@/views/layout/home/components/channel-edit"
import { getItem } from "@/utils/storage"
import { mapGetters } from "vuex"
export default {
  name: "home",
  computed: {
    ...mapGetters(["token"]),
  },
  data() {
    return {
      active: 0,
      // 1.定义变量
      channel: null,
      isEditShow: false, // 弹出层显示状态
    }
  },
  methods: {
    // 2.定义发送请求方法
    async UserInfo() {
      // 完整登录逻辑：
      // 1.判断是否登录 ? 使用户数据 :  使用本地数据
      // 2.本地是否有数据 ? 使用本地 : 使用默认接口数据
      if (this.token) {
        try {
          // 2.1 发送请求
          const { data } = await getUserChannel()
          // 2.2 赋值
          this.channel = data.data.channels
        } catch (error) {
          // 2.3 错误捕捉
          console.log(error)
        }
      } else {
        const UserInfoData = getItem("HM-TOUTIAO-CNL")
        // 判断本地数据是否存在
        if (UserInfoData) {
          // 存在，就使用本地数据
          this.channel = UserInfoData
        } else {
          // 不存在，使用线上默认接口
          try {
            // 2.1 发送请求
            const { data } = await getUserChannel()
            // 2.2 赋值
            this.channel = data.data.channels
          } catch (error) {
            // 2.3 错误捕捉
            console.log(error)
          }
        }
      }
    },
    // 子父通信儿子告诉父亲，要切换哪个数据
    changetab(idx) {
      this.active = idx // 切换高亮显示
      this.isEditShow = false // 关闭弹出层
    },
    changeLeft(i) {
      // this.active = i
    },
  },
  // 调用方法
  created() {
    this.UserInfo()
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