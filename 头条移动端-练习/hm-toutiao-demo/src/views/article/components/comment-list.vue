<template>
  <van-list
    :immediate-check="false"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- <van-cell
      v-for="item in list"
      :key="item.com_id"
      :title="item.content"
    ></van-cell> -->
    <comment-item v-for="item in list" :key="item.com_id" :comment="item" />
  </van-list>
</template>
<script>
import { getCommentInfoApi } from "@/api/Article"
import CommentItem from "./comment-item"
export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    type: {
      type: String,
      default: "a",
    },
    sourceId: {
      type: [String, Number],
      require: true,
    },
    list: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      //   list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 评论偏移量
      limit: 10, // 每页的数量
    }
  },
  created() {
    this.loading = false
    // 开始手动调用一下
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 1.请求数据
      try {
        const { data } = await getCommentInfoApi({
          type: this.type,
          source: this.sourceId,
          offset: this.offset,
          limit: this.limit,
        })
        // 2.追加数据
        this.list.push(...data.data.results)
        // 3.关闭加载
        this.loading = false
        // 4.判断数据是否结束
        if (data.data.results.length < this.limit) {
          // 数据结束
          this.finished = true
        } else {
          // 未结束,页码变化
          this.offset = data.data.last_id
        }
        // 把评论数量抛给父组件
        const { total_count } = data.data
        this.$emit("commentTotal", total_count)
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>