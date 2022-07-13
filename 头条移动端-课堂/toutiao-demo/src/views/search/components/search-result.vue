<template>
  <div class="search-result">
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
import { getSearchResultApi } from "@/api/Search"
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    }
  },
  methods: {
    async onLoad() {
      // 1.加载数据
      try {
        const { data } = await getSearchResultApi({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        })
        // 2.追加数据
        this.list.push(...data.data.results)
        // 3.关闭加载
        this.loading = false
        // 4.判断数据有无
        if (data.data.results.length < 10) {
          // 没有=》 finished  =  true
          this.finished = true
        } else {
          // 有 =》 页码++
          this.page++
        }
      } catch (error) {
        // 错误也要关闭加载
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>