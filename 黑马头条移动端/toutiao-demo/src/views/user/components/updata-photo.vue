<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css"
import Cropper from "cropperjs"
import { upDataUserPhoto } from "@/api/User"
export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null, // 裁剪器对象
    }
  },
  mounted() {
    // 只有在挂载后的钩子函数里才能获取到真实DOM
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    })
  },
  methods: {
    // 确定事件
    onConfirm() {
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        //    实例一个formData
        let fd = new FormData()
        // 添加数据
        fd.append("photo", blob)
        // 发送请求
        const { data } = await upDataUserPhoto(fd)
        const imgSrc = data.data.photo
        // 关闭弹窗
        this.$emit("close")
        // 更新视图（把更新后的头像返回去）
        this.$emit("upDataPhoto", imgSrc)
      })
    },
  },
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>