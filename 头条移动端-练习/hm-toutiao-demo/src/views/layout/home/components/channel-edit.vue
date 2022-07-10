<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isShow = !isShow"
        >{{ isShow ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in newChannel"
        :key="item.id"
      >
        <van-icon
          slot="icon"
          v-if="isShow && item.name !== '推荐'"
          name="clear"
          @click="delChannel(index)"
        ></van-icon>
        <span
          class="text"
          :class="{ active: index === activeIndex }"
          slot="text"
          >{{ item.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        :text="item.name"
        v-for="item in recommendChannel"
        :key="item.id"
        @click="addChannel(item.id)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannelApi } from "@/api/home"
export default {
  name: "ChannelEdit",
  props: {
    newChannel: {
      type: Array,
      require: true,
    },
    activeIndex: Number,
  },
  data() {
    return {
      // 全部频道
      allChannel: [],
      //   编辑/完成的状态
      isShow: false,
    }
  },
  methods: {
    // 全部频道
    async getChannel() {
      try {
        const { data } = await getAllChannelApi()
        this.allChannel = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    //添加频道
    addChannel(val) {
      this.newChannel.push(val)
    },
    // 删除频道
    delChannel(index) {
      this.newChannel.splice(index, 1)
    },
  },
  created() {
    this.getChannel()
  },
  //   推荐频道
  computed: {
    recommendChannel() {
      // 推荐频道 = 全部频道 - 我的频道
      const arr = []
      //   遍历"全部频道"
      this.allChannel.forEach((item) => {
        // 筛选出来"我的频道"
        const results = this.newChannel.find((val) => val.id === item.id)
        // 把不是"我的频道"的添加到arr中,就得到了推荐频道
        if (!results) arr.push(item)
      })
      return arr
    },
  },
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>