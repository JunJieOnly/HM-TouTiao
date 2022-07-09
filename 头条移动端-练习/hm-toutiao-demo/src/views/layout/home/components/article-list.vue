<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getrAticlesList } from "@/api/home"
export default {
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
    }
  },
  methods: {
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
        console.log(data)
      } catch (error) {
        // 捕捉错误
        console.log(error)
      }
    },
  },
}
</script>

<style>
</style>