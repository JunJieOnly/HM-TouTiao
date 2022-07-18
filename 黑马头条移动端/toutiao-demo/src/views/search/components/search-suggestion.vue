<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search', item)"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
    >
      <template #title> <span v-html="hightColorText(item)"></span> </template>
    </van-cell>
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
      timer: null,
    }
  },
  watch: {
    // 开启深度监听输入框的值
    searchText: {
      deep: true, // 开启深度监听
      immediate: true, // 立即执行一次
      handler() {
        // 判断前面的定时器是否开启，如果开启就停止上一次的定时器，重新开启下面的定时器
        if (this.timer) {
          clearTimeout(this.timer)
        }
        // 防抖： 一段时间内，不管触发多少次，只执行最后一次（本质：定时器）
        this.timer = setTimeout(() => {
          this.infoData()
        }, 200)
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
    hightColorText(text) {
      // 使用正则表达式，匹配关键字，使关键字变红
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