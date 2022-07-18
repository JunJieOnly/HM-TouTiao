<template>
  <div class="search-container">
    <!-- 搜索 -->
    <!-- 如果在ios上面 用from标签包裹 input组件且 type为search则手机键盘上的完成会变成搜索 -->
    <form action="/">
      <van-search
        v-model="searchText"
        shape="round"
        show-action
        placeholder="请输入搜索关键词"
        background="#5094f3"
        @focus="isResultsShow = false"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 条件判断=>  当isResultsShow 为true时,search-result显示,search-suggestion&search-history隐藏
                    当searchText有值时,显示search-suggestion,无值时显示search-history  -->
    <!-- 搜索结果 -->
    <search-result v-if="isResultsShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      @search="onSearch"
      :search-text="searchText"
      v-else-if="searchText"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @searchHistory="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchResult from "./components/search-result"
import SearchHistory from "./components/search-history"
import SearchSuggestion from "./components/search-suggestion"
import { getItem, setItem } from "@/utils/storage"
export default {
  name: "Search",
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion,
  },
  data() {
    return {
      searchText: "",
      isResultsShow: false, // 搜索结果是否显示
      searchHistories: getItem("TOUTIAO-HISTORY") || [], // 历史记录，1.按户回车，点击搜索建议
    }
  },
  methods: {
    onSearch(val) {
      //#region
      // #endregion
      // 当按下回车 val 就是输入框的内容
      // 当点击搜索建议时，val就是搜索建议的值
      // 按下回车键or手机键盘上的完成或者搜索按钮，触发该事件
      this.searchText = val // 输入框内容变成点击的搜索建议
      this.isResultsShow = true // 显示搜索结果
      // 方式1：ES6  Set去重
      // let setArr = new Set(this.searchHistories)
      // // 删除重复的
      // setArr.delete(val)
      // // 重新添加
      // setArr.add(val)
      // // 重新转化为数组
      // setArr = Array.from(setArr)
      // // 翻转数组
      // this.searchHistories = setArr.reverse()
      // 方式二： findIndex
      // 先遍历之前的数组，然后判断之前的数组里面是否存在当前的值
      let idx = this.searchHistories.findIndex((item) => item === val)
      // 判断，如果存在就删除
      if (idx !== -1) {
        this.searchHistories.splice(idx, 1)
      }
      // 重新添加
      this.searchHistories.unshift(val)
    },
    onCancel() {
      // 点击取消，触发该事件，返回上一级
      this.$router.back()
    },
  },
  watch: {
    searchHistories() {
      setItem("TOUTIAO-HISTORY", this.searchHistories)
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>