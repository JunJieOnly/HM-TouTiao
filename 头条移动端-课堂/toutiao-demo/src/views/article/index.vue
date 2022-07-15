<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="statusCode === 1">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="statusCode === 2">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleInfo.pubdate | relativeTime }}
          </div>
          <!-- 关注组件 -->
          <!--   <user-foolow
            :is-foollow="articleInfo.is_followed"
            :article-id="articleInfo.aut_id"
            @upDataFoollow="upDataFoollow"
          /> -->
          <!-- ------------------------------------------------------- -->
          <!-- 自定义事件绑定的事件函数的$event是子组件传递出来的数据 -->
          <!-- 场景：
          子组件既要用父组件的某个数据（父子==>props==>自定义属性名必须叫value）
          又要改父的该数据（子父==>自定义事件==>时间名必须叫input）
          <组件 :value="变量" @input="变量 = $event" />
          <组件 v-model="变量" />
           -->
          <user-foolow
            v-model="articleInfo.is_followed"
            :article-id="articleInfo.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <!-- 绑定ref,获取文章内容节点 -->
        <div
          ref="content"
          class="article-content markdown-body"
          v-html="articleInfo.content"
        ></div>
        <!-- 文章内容 -->
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" info="123" color="#777" />
          <!-- 收藏 -->
          <collectArticle
            v-model="articleInfo.is_collected"
            :article-id="articleInfo.art_id"
          />
          <!-- 点赞 -->
          <zan-article
            :is-attitude.sync="articleInfo.attitude"
            :articleId="articleInfo.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="statusCode === 4">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="statusCode === 3">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleInfoApi } from "@/api/Article"
// 引入预览图片组件
import { ImagePreview } from "vant"
// 使用组件方法
// 1.把所有的图片路径，装在一个数组里面
// 2.定义一个图片初始索引
// ImagePreview({
//   images: [
//     "https://img01.yzcdn.cn/vant/apple-1.jpg",
//     "https://img01.yzcdn.cn/vant/apple-2.jpg",
//   ],
//   startPosition: 1,
// })
import userFoolow from "@/components/follow-user"
import collectArticle from "@/components/collect-article"
import zanArticle from "@/components/zan-article"
export default {
  name: "ArticleIndex",
  components: {
    userFoolow,
    collectArticle,
    zanArticle,
  },
  data() {
    return {
      articleInfo: {},
      statusCode: 1, // 状态码： 1=加载中 2=加载成功 3=加载失败 4=网络问题404
    }
  },
  created() {
    this.getArticleInfo()
  },
  methods: {
    async getArticleInfo() {
      this.statusCode = 1 // 给重试按钮使用
      try {
        const { data } = await getArticleInfoApi(this.$route.params.id)
        this.articleInfo = data.data
        // 加载成功
        this.statusCode = 2
        // 获取文章内容中的所有图片节点
        this.$nextTick(() => {
          const NodeImg = this.$refs.content.querySelectorAll("img")
          // 获取图片路径
          const imgSrc = Array.from(NodeImg).map((item) => item.src)
          // 给每个节点绑定事件
          NodeImg.forEach((item, index) => {
            item.onclick = function () {
              // 使入预览图片方法
              ImagePreview({
                images: imgSrc,
                startPosition: index,
              })
            }
          })
        })
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // 404
          this.statusCode = 4
        } else {
          // 加载失败
          this.statusCode = 3
        }
        console.log(error)
      }
    },
    /*    upDataFoollow(val) {
      this.articleInfo.is_followed = val
    }, */
  },
}
</script>

<style scoped lang="less">
// 引入正文样式
// @import url();  原生写法
@import "@/styles/github-markdown.css"; // less写法
.article-container {
  .van-nav-bar {
    background-color: #5094f3;
  }
  /deep/.van-nav-bar__title,
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>