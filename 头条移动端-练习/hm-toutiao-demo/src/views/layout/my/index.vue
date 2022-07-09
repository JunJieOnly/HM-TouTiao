<template>
  <div class="my-container">
    <!-- 未登录 -->
    <div v-if="!token" class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" />
        <span class="text">登录&nbsp;/&nbsp;注册</span>
      </div>
    </div>
    <!-- 已登录 -->
    <div v-else class="header user-info">
      <!-- 用户信息 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 用户数据 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">喜欢</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid clickable :column-num="2" class="grid-nav mb-9">
      <van-grid-item
        class="grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
        to="/user/collect"
      />
      <van-grid-item
        class="grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
        to="/user/history"
      />
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <!-- 退出登录 -->
    <van-cell
      v-if="token"
      @click="quit"
      class="logout-cell"
      clickable
      title="退出登录"
    />
  </div>
</template>

<script>
// 获取token
import { mapGetters } from "vuex"
// 引入接口
import { UserInfoApi } from "@/api/user"
export default {
  name: "My",
  data() {
    return {
      // 定义变量
      userInfo: {},
    }
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    // 定义方法
    async userData() {
      try {
        // 发送请求
        const { data } = await UserInfoApi()
        // 处理数据
        this.userInfo = data.data
      } catch (error) {
        console.log(error)
      }
    },
    // 退出登录
    async quit() {
      // 确认框
      await this.$dialog.confirm({
        title: "提示",
        message: "确定退出吗？",
      })
      // 退出逻辑
      this.$store.commit("setUser", {})
    },
  },
  // 钩子函数
  created() {
    if (this.token) this.userData()
  },
}
</script>

<style lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>