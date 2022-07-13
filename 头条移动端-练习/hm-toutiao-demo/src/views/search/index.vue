<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @focus="isResultShow = false"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!--
    显示逻辑：isResultShow = true , 显示搜索结果
      isResultShow = false 显示搜索建议或者搜索历史
      searchText有值 显示搜索建议
      searchText无值 显示搜索历史
     -->
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      :search-text="searchText"
      @searchSug="onSearch"
      v-else-if="searchText"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :history-list="historyList"
      @searchHistory="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchResult from "./components/search-result"
import SearchHistory from "./components/search-history"
import SearchSuggestion from "./components/search-suggestion"
import { setItem, getItem } from "@/utils/storage"
export default {
  data() {
    return {
      searchText: "",
      isResultShow: false,
      historyList: getItem("HM-TOUTIAO-HSY") || [],
    }
  },
  methods: {
    // 键盘按下回车触发，val===输入框的值
    onSearch(val) {
      //点击搜索建议的结果时，当前val变成了搜索结果的值
      this.searchText = val
      // 显示搜索结果
      this.isResultShow = true
      // 保存历史记录去重
      let idx = this.historyList.findIndex((item) => item === val)
      if (idx !== -1) {
        this.historyList.splice(idx, 1)
      }
      this.historyList.unshift(val)
    },
    onCancel() {
      // 点击取消返回上一级页面
      this.$router.go(-1)
    },
  },
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion,
  },
  watch: {
    historyList() {
      setItem("HM-TOUTIAO-HSY", this.historyList)
    },
  },
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>