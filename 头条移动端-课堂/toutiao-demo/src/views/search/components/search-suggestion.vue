<template>
  <div class="search-suggestion">
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from "@/api/Search"
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
      list: [],
    }
  },
  watch: {
    // 开启深度监听输入框的值
    searchText: {
      deep: true, // 开启深度监听
      immediate: true, // 立即执行一次
      handler() {
        this.infoData()
      },
    },
  },
  created() {
    // 这样写每次只会触发一次,这样写不符合逻辑
    // this.infoData()
  },
  methods: {
    async infoData() {
      try {
        const { data } = await getSearchSuggestionApi({ q: this.searchText })
        //    边缘处理
        if (data.data.options.length === 1 && data.data.options[0] === null) {
          this.list = []
        } else {
          this.list = data.data.options
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>