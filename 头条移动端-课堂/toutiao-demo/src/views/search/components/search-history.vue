<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isEdit">
        <span @click="searchHistories.splice(0)">全部删除</span>&nbsp;&nbsp;
        <span @click="isEdit = false">完成</span>
      </span>
      <van-icon v-else name="delete" @click="isEdit = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="clickHandler(item, index)"
    >
      <van-icon name="close" v-if="isEdit" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isEdit: false, // 是否处于编辑状态
    }
  },
  methods: {
    // 判断是否编辑状态，执行不同操作
    clickHandler(item, index) {
      if (this.isEdit) {
        // 当isEdit为true时，是删除操作
        this.searchHistories.splice(index, 1)
      } else {
        // 当isEdit为false时，点击执行搜索结果
        this.$emit("searchHistory", item)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
