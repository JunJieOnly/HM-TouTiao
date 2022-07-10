<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <articleItem
          v-for="(item, index) in list"
          :key="index"
          :article-item="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getrAticlesList } from "@/api/home"
import articleItem from "@/views/layout/home/components/article-item"
export default {
  name: "ArticleList",
  components: {
    articleItem,
  },
  name: "art",
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      isLoading: false, // 加载完成
      successText: "", // 刷新成功文本
    }
  },
  methods: {
    // 列表刷新
    async onLoad() {
      // 1.获取数据
      try {
        const { data } = await getrAticlesList({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
        })
        // 2. 追加数据
        this.list.push(...data.data.results)
        // 3.关闭加载
        this.loading = false
        // 4.结束条件
        if (data.data.results.length < 10) {
          // 没有数据
          this.finished = true
        } else {
          // 有数据
          this.timestamp = data.data.pre_timestamp
        }
        // console.log(data)
      } catch (error) {
        // 捕捉错误
        console.log(error)
      }
    },
    // 下拉刷新
    async onRefresh() {
      // 获取数据
      try {
        const { data } = await getrAticlesList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        })
        // 数据追加到前面
        this.list.unshift(...data.data.results)
        this.successText = `成功加载了${data.data.results.length}条数据`
      } catch (error) {
        // 提示错误
        this.$toast.fail("刷新错误")
        console.log(error)
      }
      // 不管成功失败都关闭加载
      this.isLoading = false
    },
  },
}
</script>

<style>
</style>