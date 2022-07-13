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
import { getSearchResult } from "@/api/search"
export default {
  name: "SearchResult",
  components: {},
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
      page: 1, // 页码
      per_page: 10, // 每页数量
    }
  },
  created() {},
  methods: {
    async onLoad() {
      //  发送请求
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        })
        // 追加数据
        this.list.push(...data.data.results)
        // 结束加载
        this.loading = false
        // 判断是否结束
        if ((data.data.results, length < this.per_page)) {
          // 结束finished=true
          this.finished = true
        } else {
          // 没结束，页码加1
          this.page++
        }
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less"></style>