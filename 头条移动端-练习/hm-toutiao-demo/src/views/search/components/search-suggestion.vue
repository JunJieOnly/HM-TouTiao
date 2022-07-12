<template>
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in list" :key="index" icon="search">
      <template #title>
        <span v-html="hightColorText(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { userSearchSuggestionApi } from "@/api/search"
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      // 定义变量
      list: [],
    }
  },
  watch: {
    // 深度监听
    searchText: {
      deep: true,
      immediate: true,
      handler() {
        this.infoData()
      },
    },
  },
  methods: {
    // 请求数据
    async infoData() {
      try {
        const { data } = await userSearchSuggestionApi({ q: this.searchText })
        this.list = data.data.options
      } catch (error) {
        console.log(error)
      }
    },
    // 关键字红色高亮
    hightColorText(text) {
      let reg = new RegExp(this.searchText, "gi") // g是全局匹配； i 忽略大小写
      return text.replace(
        reg,
        `<span style="color:red;">${this.searchText}</span>`
      )
    },
  },
}
</script>

<style scoped lang="less"></style>