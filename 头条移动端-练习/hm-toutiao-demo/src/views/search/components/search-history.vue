<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isEdit">
        <span @click="historyList.splice(0)">全部删除</span>&emsp;
        <span @click="isEdit = false">完成</span>
      </span>
      <van-icon name="delete" v-else @click="isEdit = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in historyList"
      :key="index"
      @click="EditItem(item, index)"
    >
      <van-icon name="close" v-if="isEdit" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    historyList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isEdit: false,
    }
  },
  methods: {
    EditItem(val, idx) {
      if (this.isEdit) {
        // 点击删除
        this.historyList.splice(idx, 1)
      } else {
        // 点击搜索
        this.$emit("searchHistory", val)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>