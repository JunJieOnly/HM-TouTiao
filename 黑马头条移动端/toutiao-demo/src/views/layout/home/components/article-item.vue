<template>
  <div>
    <!-- 标题 -->
    <van-cell class="article-item" :to="`/article/${articleItem.art_id}`">
      <template #title>
        <h3 class="title van-multi-ellipsis--l2">{{ articleItem.title }}</h3>
      </template>
      <!-- 右侧 -->
      <template #default v-if="articleItem.cover.type === 1">
        <van-image
          :src="articleItem.cover.images[0]"
          class="right-cover"
          fit="cover"
        ></van-image>
      </template>
      <!-- 底部 -->
      <template #label>
        <div v-if="articleItem.cover.type === 3" class="cover-wrap">
          <van-image
            v-for="(val, idx) in articleItem.cover.images"
            :key="idx"
            :src="val"
            class="cover-item-img"
            fit="cover"
          ></van-image>
        </div>
        <div class="label-info-wrap">
          <span>{{ articleItem.aut_name }}</span
          ><span>{{ articleItem.comm_count }}</span
          ><span>{{ articleItem.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "articltItem",
  props: {
    articleItem: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>