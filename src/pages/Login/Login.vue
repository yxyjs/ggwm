<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{true_phone:rightPhone}"
                @click.prevent="getCode"
              >{{ computedTime ? `已发送${computedTime}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <input
                  :type="showPwd ? 'text': 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  class="get_verification"
                  src="http://localhost:3000/captcha"
                  @click="getCaptcha"
                  alt="captcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goBack">
        <i class="iconfont icon-zuojiantou"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </section>
</template>

<script type="text/ecmascript-6">
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "@/api";
export default {
  data() {
    return {
      loginWay: false, //true代表短信登录,false代表密码登录
      phone: "", //手机号
      computedTime: 0, //倒计时
      showPwd: false, //是否显示密码
      pwd: "", //密码
      code: "", //手机验证码
      captcha: "", //图形验证码
      name: "",
      alertText: "", //提示内容
      alertShow: false
    };
  },
  computed: {
    rightPhone() {
      return /^1[3456789]\d{9}$/.test(this.phone);
    }
  },
  methods: {
    // 异步获取验证码
    async getCode() {
      // 如果没有计时器
      if (!this.computedTime) {
        // 启动倒计时
        this.computedTime = 10;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime === 0) {
            clearInterval(this.timer);
          }
        }, 1000);
        // 发送ajax请求
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          //显示提示
          this.openTip(result.msg);
          //停止计时
          if (this.timer) {
            this.computedTime = 0;
            clearInterval(this.timer);
            this.timer = null;
          }
        }
      }
    },
    // 异步登录
    async login() {
      this.$router.replace("/profile");
      return;
      let result;
      if (this.loginWay) {
        //短信登录
        const { rightPhone, code, phone } = this;
        if (!rightPhone) {
          // 手机号不正确
          this.openTip("手机号不正确");
        } else if (!/^d{6}$/.test(code)) {
          //验证码必须是6位数字
          this.openTip("验证码必须是6位数字");
        }
        // 发送ajax
        result = await reqSmsLogin(phone, code);
      } else {
        //密码登录
        const { name, pwd, captcha } = this;
        if (!name) {
          //用户名必须指定
          this.openTip("用户名必须指定");
        } else if (!pwd) {
          // 密码必须指定
          this.openTip("密码必须指定");
        } else if (!captcha) {
          // 验证码必须指定
          this.openTip("验证码必须指定");
        }
        // 发送ajax
        result = await reqPwdLogin({ name, pwd, captcha });
      }

      // 停止计时
      if (this.timer) {
        this.computedTime = 0;
        clearInterval(this.timer);
        this.timer = null;
      }
      // 根据结果数据处理
      if (result.code === 0) {
        // 将user保存到vuex
        // 去个人中心页面
        this.$router.replace("/profile");
      } else {
        // 显示新的图形验证码
        this.getCaptcha();
        // 显示警告提示
        const msg = result.msg;
        this.alertShow(msg);
      }
    },
    // 打开提示
    openTip(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
      return;
    },
    // 关闭提示
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    // 获取一次验证码
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:3000/captcha?time=" + Date.now();
    },
    goBack() {
      this.$router.back();
    }
  },
  components: {
    AlertTip
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl'

.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.true_phone
                color #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
