<template>
  <div class="phoneAuthentication">
    <div class="header">
      <div class="back" @click="goBack"><img src="@/assets_zx/ic_arrow_back.png" alt=""></div>
      商户绑定
    </div>
    <img src="@/assets_zx/ic_launcher.png" alt="">
    <div class="authentication">
      <div class="authenticationInput">
        <input :class="phoneFocus ? 'btFocus': ''" @focus="phoneFocus=true" @blur="scrollTop1" type="text" maxlength="11" v-model="phone" placeholder="手机号" />
      </div>
      <div class="authenticationInput">
        <input :class="psdFocus ? 'btFocus': ''" @focus="psdFocus=true" @blur="scrollTop2" type="text" maxlength="16" v-model="password" placeholder="密码" />
      </div>
      <div id="captcha"></div>
      <div class="authenticationBtn">
        <van-button class="btn" plain type="primary" @click="binding">确定</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Button } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import sa from 'sa-sdk-javascript'
Vue.use(Button)
export default {
  data () {
    return {
      phone: '',
      password: '',
      seconds: 60,
      again: true,
      phoneFocus: false,
      psdFocus: false,
      jumpUrlInfo: {},
      verifyType: ''
    }
  },
  created () {
    var that = this
  },
  methods: {
    binding () {
      if (this.phone.length !== 11) {
        Toast('请输入11位合法手机号！')
        return
      }
      if (this.verifyType === '') {
        Toast('请先获取短信验证码！')
        return
      }
      if (this.password.length !== 11) {
        Toast('请输入11位密码！')
        return
      }
      let params = {
        clientType: 'h5',
        authType: 'weixin',
        verifyType: this.verifyType,
        authKey: this.$route.query.authKey,
        verifycode: this.password,
        phone: this.phone
      }
      let paramsString = qs.stringify(params)
      console.log(paramsString)
      api.bindPhone(paramsString).then(res => {
        if (res.code === 0) {
          Toast('绑定成功')
          if (res.data.tokenType == 'login') {
            sa.login(res.data.uid)
            this.$store.dispatch('save_token', res.data.token)
            if (localStorage.getItem('jumpUrl')) {
              if (JSON.parse(localStorage.getItem('jumpUrl')).query.id) {
                this.$router.push({
                  path: JSON.parse(localStorage.getItem('jumpUrl')).path,
                  query: {
                    id: JSON.parse(localStorage.getItem('jumpUrl')).query.id,
                    load: 'loaded'
                  }
                })
              } else if (JSON.parse(localStorage.getItem('jumpUrl')).query.userId) {
                this.$router.push({
                  path: JSON.parse(localStorage.getItem('jumpUrl')).path,
                  query: {
                    userId: JSON.parse(localStorage.getItem('jumpUrl')).query.userId,
                    load: 'loaded'
                  }
                })
              }
            }
          }
        } else if (res.code === 11000) {
          // 重新加载
          Toast('失效')
        }
      })
    },
    goBack () {
      window.history.back()
    },
    scrollTop1 () {
      this.phoneFocus = false
      window.scroll(0, 0);
    },
    scrollTop2 () {
      this.psdFocus = false
      window.scroll(0, 0);
    }
  }
}
</script>
<style lang="scss" scoped>
.phoneAuthentication {
  .header {
    height: 56px;
    line-height: 56px;
    font-weight: 500;
    font-size: 16px;
    background-color: #fff;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      margin-top: 16px;
      margin-left: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .warningInfo {
    display: block;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.60);
    text-align: left;
    line-height: 18px;
    margin-top: 32px;
    margin-left: 35px;
  }
  .authentication {
    padding: 8px 0;
    margin: 0 32px;
    .authenticationInput {
      height: 48px;
      width: 100%;
      margin-top: 16px;
      position: relative;
      input {
        height: 48px;
        width: 100%;
        box-sizing: border-box;
        padding: 15px 8px;
        font-size: 16px;
        background-color: transparent;
        color: #fff;
        line-height: 22px;
        outline: none;
        border-bottom: 1px solid rgba(0,0,0,0.26);
        font-family: PingFangSC-Regular;
        color: rgba(0,0,0,0.87);
      }
      .btFocus {
        border-bottom: 2px solid #ffad71;
      }
      .getYZM {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffad71;
        text-align: right;
        line-height: 18px;
        position: absolute;
        bottom: 15px;
        right: 8px;
      }
      .countdown {
        color: rgba(0,0,0,0.26);
      }
    }
    .authenticationBtn {
      margin-top: 32px;
      .btn {
        width: 100%;
        height: 36px;
        background: linear-gradient(135deg,#ffad71,#ff7f4a);
        border-radius: 2px;
        border: 0;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #FFFFFF;
        text-align: center;
        line-height: 18px;
      }
    }
  }
}
#captcha {
  width: 320px;
  height: 40px;
}
</style>
