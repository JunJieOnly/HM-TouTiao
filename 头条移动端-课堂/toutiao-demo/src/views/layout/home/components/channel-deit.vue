<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        @click="isEdit = !isEdit"
        type="danger"
        plain
        round
        size="mini"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannel"
        :key="item.id"
        @click="clickHandler(item, index)"
      >
        <van-icon
          slot="icon"
          v-if="isEdit && index !== activeIndex"
          name="clear"
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
        v-for="item in recommentChannels"
        :key="item.id"
        class="grid-item"
        icon="plus"
        :text="item.name"
        @click="addChannel(item)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannelApi,
  addUserChannelApi,
  delUserChannelApi,
} from "@/api/Home"
import { mapGetters } from "vuex"
import { setItem } from "@/utils/storage"
export default {
  name: "ChannelEdit",
  props: {
    myChannel: {
      type: Array,
      require: true,
    },
    activeIndex: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      // 定义变量
      allChannels: [],
      // 是否处于编辑状态
      isEdit: false,
    }
  },
  computed: {
    ...mapGetters(["token"]),
    recommentChannels() {
      // 筛选频道推荐数据
      // 定义一个数组
      const arr = []
      //  频道推荐 = 全部频道 - 我的频道
      // 遍历全部频道，过滤掉我的频道数据，剩下的就是频道推荐
      this.allChannels.forEach((item) => {
        // 判断item是不是我的频道里面的数据，如果不是，则把它放在arr，说明就是推荐频道的数据
        let result = this.myChannel.find((val) => val.id === item.id)
        // result 如果存在说明，就是我的频道数据，result不存在就是推荐频道的数据
        if (!result) arr.push(item)
      })
      return arr
      // 进阶用法 filter
      // filter返回一个新数组
      // const NewArr = this.allChannels.filter(item => 满足条件（this.myChannel.find((val) => val.id === item.id)）)
      // return NewArr
    },
  },
  created() {
    this.infoDate()
  },
  methods: {
    // 定义方法
    async infoDate() {
      try {
        const { data } = await getAllChannelApi()
        // 赋值
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 添加频道
    async addChannel(val) {
      // 添加到我的频道数据
      this.myChannel.push(val)
      //数据持久化的逻辑,判断用户是否登录
      if (this.token) {
        // 登录了，存储到线上
        try {
          // 调接口
          await addUserChannelApi({
            // 传接口，上传到线上
            channels: [
              {
                id: val.id,
                seq: this.myChannel.length - 1,
              },
            ],
          })
        } catch (error) {
          this.$toast.fail("同步线上失败")
        }
      } else {
        // 未登录，存储到本地
        setItem("TOUTIAO-USER-CHANNELS", this.myChannel)
      }
    },
    // 点击我的频道操作
    clickHandler(val, idx) {
      // 判断是否处于编辑状态
      if (this.isEdit) {
        // 如果是推荐，不能删除
        if (val.name === "推荐") return
        // 如果删除的是激活项，则激活项目左边的内容，那么高亮激活索引同步
        if (idx <= this.activeIndex) {
          this.$emit("changeIndex", this.activeIndex - 1)
        }
        // true,点击删除
        this.myChannel.splice(idx, 1)
        // 调用删除逻辑
        this.delSaveHandler(val.id)
      } else {
        // false  点击关闭弹出层，跳转对应tab内容 ,子父通信
        this.$emit("changeTab", idx)
      }
    },
    // 删除持久化逻辑
    async delSaveHandler(channel_id) {
      if (this.token) {
        // 登录了，同步线上
        await delUserChannelApi(channel_id)
      } else {
        // 未登录，保存本地
        setItem("TOUTIAO-USER-CHANNELS", this.myChannel)
      }
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