<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      @click="$refs.imgFile.click()"
      center
    >
      <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
    </van-cell>
    <input type="file" ref="imgFile" hidden @change="changeFn" />
    <!-- 修改头像 -->
    <van-popup v-model="isUpdataPhoto" position="bottom" style="height: 100vh">
      <updata-Photo
        :img="imgSrc"
        @close="isUpdataPhoto = false"
        @updataImg="userInfo.photo = $event"
      />
    </van-popup>
    <!-- /修改头像 -->
    <van-cell
      title="昵称"
      @click="isUpdataName = true"
      :value="userInfo.name"
      is-link
    />
    <!-- 修改昵称 -->
    <van-popup position="bottom" style="height: 100%" v-model="isUpdataName">
      <updata-name
        @close="isUpdataName = false"
        :userName.sync="userInfo.name"
        v-if="isUpdataName"
      />
    </van-popup>
    <!-- /修改昵称 -->
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdataSex = true"
    />
    <!-- 修改性别 -->
    <van-popup v-model="isUpdataSex" position="bottom">
      <updata-sex
        v-if="isUpdataSex"
        @close="isUpdataSex = false"
        :user-sex.sync="userInfo.gender"
      />
    </van-popup>
    <!-- /修改性别 -->
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      @click="isUpdataBirthday = true"
      is-link
    />
    <!-- 修改生日 -->
    <van-popup v-model="isUpdataBirthday" position="bottom">
      <updata-birthday
        @close="isUpdataBirthday = false"
        :user-birthday.sync="userInfo.birthday"
      />
      <!-- /修改生日 -->
      <!-- /个人信息 -->
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/api/user"
import updataName from "./components/updata-name.vue"
import updataSex from "./components/updata-sex.vue"
import updataBirthday from "./components/updata-birthday.vue"
import updataPhoto from "./components/updata-photo.vue"
export default {
  name: "UserProfile",
  components: { updataName, updataSex, updataBirthday, updataPhoto },
  props: {},
  data() {
    return {
      userInfo: {},
      isUpdataName: false,
      isUpdataSex: false,
      isUpdataBirthday: false,
      isUpdataPhoto: false,
      imgSrc: "",
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfoApi()
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail("获取用户资料失败")
        console.log(error)
      }
    },
    changeFn() {
      const imgFiles = this.$refs.imgFile.files[0]
      const imgType = ["image/jpg", "image/png", "image/jpeg", "image/gif"]
      if (!imgType.includes(imgFiles.type)) {
        return this.$toast.fail("图片格式不正确")
      }
      const maxSize = 1024 * 1024 * 3
      if (maxSize < imgFiles.size) {
        return this.$toast.fail("图片最大不能超过3M")
      }
      this.imgSrc = URL.createObjectURL(imgFiles)
      this.isUpdataPhoto = true
      this.$refs.imgFile.value = null
    },
  },
}
</script>

<style scoped lang="less">
.user-profile {
  .van-nav-bar {
    background-color: #3296fa;
    /deep/.van-icon-arrow-left,
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>