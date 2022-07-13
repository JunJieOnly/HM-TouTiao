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
    <search-history v-else />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchResult from "./components/search-result"
import SearchHistory from "./components/search-history"
import SearchSuggestion from "./components/search-suggestion"
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
    }
  },
  methods: {
    // 一石二鸟，输入框和子组件抛出来的事件同时绑定这个事件
    onSearch(val) {
      //#region
      // #endregion
      // 当按下回车 val 就是输入框的内容
      // 当点击搜索建议时，val就是搜索建议的值
      // 按下回车键or手机键盘上的完成或者搜索按钮，触发该事件
      this.searchText = val // 输入框内容变成点击的搜索建议
      this.isResultsShow = true // 显示搜索结果
    },
    onCancel() {
      // 点击取消二次，触发该事件，并清输入框内内容
      console.log("取消")
    },
  },
}
</script>

<style lang="less" scoped>
</style>