<template>
  <div>
    <!-- vanlist 属性控制是否处于加载中，true表示加载中，false表示加载结束 会自动变化！ -->
    <!-- v-model 属性表示列表是否全部加载完成，没有更多数据了 -->
    <!-- finished 属性表示是否全部加载完成，没有更多数据了 -->
    <!-- finised-text 没有数据的时候展示的文字 -->
    <!-- 自定义事件load 很重要！ 加载数据事件 -->
    <!-- loda事件页面一旦打开就自动调用，直到页面铺满为止就不调用，如果滚到到了底部就继续调用，直到没有数据 -->
    <van-pull-refresh
      v-model="isLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListApi } from "@/api/Home"
export default {
  name: "articleList",
  props: {
    channel: {
      type: Object, // 对象样式
      required: true, // 必须传入
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(), // 时间戳
      error: false, // 是否出错
      isLoading: false, // 是否下拉刷新中
      successText: "", // 刷新成功文本
    }
  },
  methods: {
    // 列表刷新
    async onLoad() {
      //  1.发送请求
      try {
        const { data } = await getArticleListApi({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp, // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 测试错误
        /* if (Math.random() * 10 > 7) {
          JSON.parse("qwer")
        } */
        // 2.将数据追加到列表，而不是赋值
        this.list.push(...data.data.results)
        // 3.关闭加载中
        this.loading = false
        // 4.判断是否结束(接口每次的返回值都是10条，如果小于十就是数据没有了)
        if (data.data.results.length < 10) {
          // 结束了
          this.finished = true
        } else {
          // 没有结束，处理时间戳
          this.timestamp = data.data.pre_timestamp
        }
      } catch (error) {
        // 关闭加载中
        this.loading = false
        // 错误捕捉之后把error改为true
        this.error = true
        console.log(error)
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        // 获取最新数据
        const { data } = await getArticleListApi({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 追加最新数据到前面
        this.list.unshift(...data.data.results)
        // 设置下拉刷新文本
        this.successText = `成功加载了${data.data.results.length}条数据`
      } catch (error) {
        console.log(error)
        // 更新失败提示文本
        this.$toast.fail("更新失败")
      }
      // 只要刷新就要关闭加载
      this.isLoading = false
    },
  },
}
</script>

<style>
</style>