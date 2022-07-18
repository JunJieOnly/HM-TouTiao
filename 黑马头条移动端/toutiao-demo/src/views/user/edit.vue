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
      @click="$refs.iptFile.click()"
      class="avatar-cell"
      title="头像"
      is-link
      center
    >
      <input type="file" hidden ref="iptFile" @change="changImg" />
      <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateName = true"
      title="昵称"
      :value="userInfo.name"
      is-link
    />
    <van-cell
      @click="isUpdateSex = true"
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      @click="isUpdateBirthday = true"
      title="生日"
      :value="userInfo.birthday"
      is-link
    />
    <!-- /个人信息 -->
    <!-- 修改框 -->
    <van-popup position="bottom" style="height: 100vh" v-model="isUpdatePhoto">
      <update-photo
        @upDataPhoto="userInfo.photo = $event"
        :img="previewUrl"
        v-if="isUpdatePhoto"
        @close="isUpdatePhoto = false"
      />
    </van-popup>
    <van-popup position="bottom" style="height: 100vh" v-model="isUpdateName">
      <update-name
        v-if="isUpdateName"
        :userName.sync="userInfo.name"
        @close="isUpdateName = false"
      />
    </van-popup>
    <van-popup position="bottom" v-model="isUpdateSex">
      <update-sex
        @close="isUpdateSex = false"
        :gender-index.sync="userInfo.gender"
        v-if="isUpdateSex"
      />
    </van-popup>
    <van-popup position="bottom" v-model="isUpdateBirthday">
      <update-birthday
        @close="isUpdateBirthday = false"
        :birthday.sync="userInfo.birthday"
        v-if="isUpdateBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/User"
import UpdateName from "./components/update-name.vue"
import UpdateSex from "./components/update-sex.vue"
import UpdateBirthday from "./components/update-birthday.vue"
import UpdatePhoto from "./components/updata-photo.vue"
export default {
  name: "UserProfile",
  components: { UpdateName, UpdateSex, UpdateBirthday, UpdatePhoto },
  props: {},
  data() {
    return {
      userInfo: {},
      isUpdatePhoto: false,
      isUpdateName: false,
      isUpdateSex: false,
      isUpdateBirthday: false,
      previewUrl: "", // 图片预览数据
    }
  },
  created() {
    this.infoData()
  },
  methods: {
    async infoData() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$$toast.fail("获取资料失败")
        console.log(error)
      }
    },
    // 上传头像
    async changImg() {
      const imgFile = this.$refs.iptFile.files[0]
      // 1.判断文件类型
      const typeArr = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
      if (!typeArr.includes(imgFile.type)) {
        //是否包含这种类型
        return this.$toast.fail("文件类型不正确")
      }
      // 2.判断文章大小
      const maxSize = 1024 * 1024 * 3
      if (imgFile.size > maxSize) {
        return this.$toast.fail("文件不允许超过3M")
      }
      // 3.生成预览地址（传递给updata-photo组件）
      this.previewUrl = URL.createObjectURL(imgFile)
      // 4.打开弹框
      this.isUpdatePhoto = true
      // 5.释放控件
      this.$refs.iptFile.value = null
    },
  },
}
</script>

<style scoped lang="less">
.user-profile {
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