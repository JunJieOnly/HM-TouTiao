<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <CommentItem
      @replyHandler="$emit('replyHandler', $event)"
      v-for="item in list"
      :key="item.com_id"
      :comment="item"
    />
  </van-list>
</template>
<script>
import { getCommentListApi } from "@/api/Article"
import CommentItem from "./comment-item"
export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    sourceId: {
      type: [String, Number],
      require: true,
    },
    list: {
      type: Array,
      require: true,
      default: () => [], // 复杂类型要使用回调函数,就像data为什么是一个回调函数,因为每次引用都会返回一个新数组或者对象,防止数据冲突
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 评论偏移量
      limit: 10,
    }
  },
  created() {
    ;(this.loading = true), this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 1.获取数据
        const { data } = await getCommentListApi({
          type: this.type,
          source: this.sourceId,
          offset: this.offset,
          limit: this.limit,
        })
        // 2.追加数据
        // console.log(data)
        this.list.push(...data.data.results)
        // 3.关闭加载
        this.loading = false
        // 4.判断是否结束
        if (data.data.results.length < this.limit) {
          // 无数据
          this.finished = true
        } else {
          // 有数据
          this.offset = data.data.last_id
        }
        // 把评论总数抛出去
        this.$emit("commentTotal", data.data.total_count)
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>