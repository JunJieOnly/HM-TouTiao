<template>
  <div class="login-contanier">
    <!-- 头部导航 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 头部导航 -->
    <!-- 登录表单 -->
    <!-- 给van-form绑定ref属性 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        type="Number"
        name="mobile"
        maxlength="11"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="user.code"
        type="Number"
        name="code"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #button>
          <!-- 防止点击发送验证码触发表单提交事件，需要给发送验证码添加native-type="button"（vant文档） -->
          <!-- 使用v-if,v-else实现点击发送验证码出现倒计时，倒计时结束出现发送验证码 -->
          <van-button
            v-if="isCountDownShow"
            size="small"
            type="primary"
            native-type="button"
            ><van-count-down :time="5000" format="ss 秒" @change="changeFn"
          /></van-button>
          <van-button
            v-else
            size="small"
            type="primary"
            native-type="button"
            @click="sendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
import { sendSmsApi, userLogin } from "@/api/Login"
export default {
  data() {
    return {
      isCountDownShow: false,
      user: {
        mobile: "",
        code: "",
      },
      // 表单校验
      rules: {
        mobile: [
          // 必填属性校验 ===> 先执行上面，再执行下面
          { required: true, message: "请输入手机号" },
          // 设置正则表达式来校验表单
          { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: "手机号格式不正确" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /\d{6}$/, message: "验证码格式不正确" },
        ],
      },
    }
  },
  methods: {
    // 登录
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // forbidClick设置成true，防止loading过程中，用户点击页面
        duration: 0, // loading加载时长，设置为0则一直加载
      })

      // 发送登录请求
      try {
        const { data } = await userLogin(this.user)
        console.log(data)
      } catch (error) {
        console.log(error)
      }

      // 数据请求成功后，手动调用clear方法清除当前页面的loading
      this.$toast.clear()
    },
    // 发送验证码
    async sendSms() {
      // 发送验证码之前校验手机号是否正确
      // 调用van-form组件实例上的validate方法，校验指定的表单项,返回值是一个Promise对象

      // 方式一：原始promise方式 （不推荐，代码冗余）
      /* this.$refs.form
        .validate("mobile")
        .then((res) => {
          console.log("校验通过")
          this.isCountDownShow = true
        })
        .catch((err) => {  // 是一个函数，所以return之后，下面的代码还是会执行
          // console.log(err)
        }) */

      // 方式二：async/await（推荐）
      try {
        // 正确的代码走在tyr里面，不会走到下面的chatch里面
        await this.$refs.form.validate("mobile")
      } catch (err) {
        // 是一个方法return就是直接结束当前sendSms函数，不执行下面的代码
        // 异常的代码走在这里，如果校验不通过就会走到catch里面，此时return掉，不让代码继续执行
        // console.log(err)
        return
      }

      // 校验通过 ==> 代码继续执行
      this.isCountDownShow = true

      // 请求验证码接口
      try {
        // 成功提示
        await sendSmsApi(this.user.mobile)
        this.$toast.success("发送验证码成功")
      } catch (err) {
        // 错误提示
        const { response } = err
        this.$toast.fail(response.data.message)
      }
    },
    // 监听倒计时变化,当倒计时为0时，立马隐藏倒计时
    changeFn(time) {
      const { seconds } = time
      if (seconds === 0) {
        this.isCountDownShow = false
      }
    },
  },
}
</script>


<style lang="less">
// 所有样式都写在一个根类名下，也可以避免样式冲突
.login-contanier {
  .van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
    .van-count-down {
      color: #fff;
    }
  }
}
</style> 
<style lang="less" scoped>
// 使用scope会带来一些弊端，比如修改第三方组件的样式会失效：(解决方式：类名前加/deep/，样式穿透)
.login-contanier {
  .van-nav-bar {
    background-color: #3296fa;
  }
  /deep/.van-icon {
    color: #fff;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/ .van-count-down {
    color: #fff;
  }
}
</style>
