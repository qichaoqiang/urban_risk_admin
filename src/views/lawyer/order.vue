<template>
  <div class="container">
    <div class="content">
      <div class="select_tip">请选择服务</div>
      <div class="select_box">
        <div class="select_tab">
          <div class="select_tab_item" id="gold" :class="{select_tab_item_active: type == 'gold'}" @click="select('gold')">
            <img class="select_tab_icon" src="@/assets/ic_recomd.png">
            <div class="select_tab_type">文字咨询</div>
            <div class="select_tab_price">20元/次</div>
          </div>
          <div class="line1" :class="{line1_none: type == 'experience'}"></div>
          <div class="select_tab_item" id="diamond" :class="{select_tab_item_active: type == 'diamond'}" @click="select('diamond')">
            <img class="select_tab_icon" src="@/assets/ic_recomd.png">
            <div class="select_tab_type">电话咨询</div>
            <div class="select_tab_price">79元/次</div>
          </div>
          <div class="line1" :class="{line1_none: type == 'gold'}"></div>
          <div class="select_tab_item" id="experience" :class="{select_tab_item_active: type == 'experience'}" @click="select('experience')">
            <div class="select_tab_type">包年版</div>
            <div class="select_tab_price">399元/年</div>
          </div>
        </div>
        <div class="select_detail">
          <div class="select_detail_item select_detail_head">
            <div class="select_detail_key">权益项目</div>
            <div class="select_detail_value">细则</div>
          </div>
          <div class="line2"></div>
          <div class="select_detail_item" v-for="(item, index) in service[type].detail" :key="index">
            <div class="select_detail_key">{{item.key}}</div>
            <div class="select_detail_value">{{item.value}}</div>
          </div>
          <div class="line2" style="margin-top: 12px;"></div>
          <div class="select_detail_bottom">
            <div class="select_detail_bottom_key">服务期限</div>
            <div class="select_detail_bottom_value" style="flex: 1">{{service[type].time}}</div>
            <div class="select_detail_bottom_key">金额</div>
            <div class="select_detail_bottom_value" style="color: #C38E3E;">{{service[type].price}}元</div>
          </div>
        </div>
      </div>
      <div class="login_box">
        <div class="login_item">
          <div class="login_text">手机号</div>
          <input class="login_input" ref="login_input" type="number" placeholder="请输入手机号码" v-model="phone"></input>
        </div>
        <!-- <div class="line4"></div>
        <div class="login_item">
          <div class="login_text">验证码</div>
          <input class="login_input" ref="code_input" type="number" placeholder="请输入手机号码" v-model="code"></input>
          <div class="login_code_btn" :class="{login_code_btn_send: !isSend}" id="getPhoneCode" @click.stop.prevent="getCode">{{codeText}}</div>
        </div> -->
      </div>
      <div class="pay_method">
        <div class="pay_method_item">
          <img class="pay_method_icon" src="@/assets/ic_pay_wechat.png">
          <div class="pay_method_text">微信支付</div>
          <div class="pay_method_check" id="WEIXIN_H5" @click="selectPayType('WEIXIN_H5')">
            <img class="pay_method_check" :src="payType == 'WEIXIN_H5' ? require('@/assets/checkbox_on.png') : require('@/assets/checkbox_off.png')">
          </div>
        </div>
        <div class="line5"></div>
        <div class="pay_method_item">
          <img class="pay_method_icon" src="@/assets/ic_pay_alipay.png">
          <div class="pay_method_text">支付宝支付</div>
          <div class="pay_method_check" id="wap" @click="selectPayType('wap')">
            <img class="pay_method_check" :src="payType == 'wap' ? require('@/assets/checkbox_on.png') : require('@/assets/checkbox_off.png')">
          </div>
        </div>
      </div>
      <div class="argument-agree" @click="changeAgree">
        <div class="check" v-if="isAgreement"><img src="@/assets/agreement_on.png"></div>
        <div class="check" v-else><img src="@/assets/agreement_off.png"></div>
        <span>支付即表示同意<span @click.stop="goAgreement">《高端家庭律师服务会员协议》</span></span>
      </div>
    </div>
    <div class="pay_box">
      <div class="pay">
        <div class="pay_price">
          <div class="pay_price_text">总计</div>
          <div class="pay_price_num">{{service[type].price}}元</div>
        </div>
        <div class="pay_btn" id="pay_btn" @click="register">确认支付</div>
      </div>
      <div class="pay_bottom">法制文明进万家活动限时优惠 活动截止时间 {{date}}</div>
    </div>
    <div class="form" id="form"></div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import { Toast } from 'vant'
  import { getScript, isWechat } from '@/utils/global.js'
  import storage from 'good-storage'
  import $ from 'zhangjia-zepto'
  export default {
    data() {
      return {
        isAgreement: true,
        date: '',
        phone: '',
        code: '',
        isSend: true,
        type: 'gold',
        codeText: '获取验证码',
        validate: '',
        timer: null,
        payType: 'WEIXIN_H5',
        canPay: true,
        orderInfo: {},
        service: {
          gold: {
            detail: [
              {
                key: '文字咨询服务，有问必答',
                value: '7次提问， 24小时有效',
              }, {
                key: '全天候专属VIP客服',
                value: '1名',
              }
            ],
            price: '20.00',
            orderStatus: 1,
            time: '24小时'
          },
          diamond: {
            detail: [
              {
                key: '文字咨询服务，有问必答',
                value: '3次追问，24小时有效',
              }, {
                key: '电话咨询服务',
                value: '不限时长次数，24小时有效',
              }, {
                key: '全天候专属VIP客服',
                value: '1名',
              }
            ],
            price: '79.00',
            orderStatus: 2,
            time: '24小时'
          },
          experience: {
            detail: [
              {
                key: '文字咨询服务，有问必答',
                value: '不限时，不限次',
              }, {
                key: '电话咨询服务',
                value: '不限时，不限次',
              }, {
                key: '起草/审查/修改法律文书',
                value: '1份',
              }, {
                key: '全天候专属VIP客服',
                value: '1名',
              }, {
                key: '1+N律师组团服务',
                value: '3-5名',
              }
            ],
            price: '399.00',
            orderStatus: 3,
            time: '1年'
          }
        }
      }
    },
    watch: {

    },
    computed: {
      isPhone() {
        return /^1([358][0-9]|4[56789]|6[67]|7[0135678]|9[189])\d{8}$/.test(this.phone);
      },
      isCode() {
        return /^[0-9]{4}$/.test(this.code)
      }
    },
    methods: {
      getTime() {
        let time = new Date(new Date().getTime() + 86400000);
        let date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
        this.date = date;
      },
      select(type) {
        let obj = {
          gold: '黄金',
          diamond: '钻石',
          experience: '体验'
        }
        let level = obj[type];
        sa.quick('trackHeatMap', document.getElementById(type), {
          level
        });
        this.type = type;
      },
      selectPayType(type) {
        let obj = {
          'WEIXIN_H5': '微信支付',
          'wap': '支付宝'
        }
        let payType = obj[type];
        sa.quick('trackHeatMap', document.getElementById(type), {
          payType
        });
        this.payType = type;
      },
      changeAgree() {
        this.isAgreement = !this.isAgreement;
      },
      goAgreement() {
        this.$router.push('/agreement');
      },
      setCaptcha(){
        getScript('//cstaticdun.126.net/load.min.js',()=>{
          this.initCaptcha()
        })
      },
      // 网易云盾初始化
      initCaptcha(){
        let self = this
        initNECaptcha({
          captchaId: '6404ded8c53b464c9f0071f415fbff01',
          element: '#getPhoneCode',
          mode: 'bind',
          width: 320,
          onVerify: function (err, data) {
            if(data){
              self.validate = data.validate
              self.sendPhoneCode()
            }
          }
        }, function onload (instance) {
          self.inst = instance
        }, function onerror (err) {
          Toast('验证码初始化失败，请刷新页面');
        })
      },
      sendPhoneCode() {
        if(this.isSend) {
          let data
          if(this.isPhone) {
            data = {
              userPhone: this.phone,
              validate: this.validate,
              platform: 'H5'
            }
          }else {
            Toast('请输入正确的手机号');
            return false;
          }
          let self = this;
          api.sendPhoneCodeV1(data).then(res => {
            if (res.code == 0) {
              this.hasCode = true;
              Toast('发送验证码成功');
              let seconds = 60;
              let getCode = function () {
                if (seconds > 0) {
                  self.isSend = false;
                  self.codeText = seconds + '秒';
                  seconds--;
                } else {
                  self.codeText = '已发送';
                  clearInterval(self.timer);
                  setTimeout(() => {
                    self.isSend = true;
                    self.codeText = '获取验证码'
                    self.initCaptcha();
                  }, 1000)
                }
              }
              getCode();
              self.timer = setInterval(getCode, 1000);
            } else {
              Toast(res.msg)
            }
          })
        }
      },
      getCode(){
        sa.quick('trackHeatMap', document.getElementById('getPhoneCode'), {
          phone: this.phone
        })
        if(!this.isPhone) {
          this.$refs.login_input.focus();
          Toast('请输入正确的手机号后获取')
        }else {
          this.inst && this.inst.verify();
        }
      },
      register() {
        let obj1 = {
          'WEIXIN_H5': '微信支付',
          'wap': '支付宝'
        }
        let payType = obj1[this.payType];
        let obj2 = {
          gold: '黄金',
          diamond: '钻石',
          experience: '体验'
        }
        let level = obj2[this.type];
        let price = this.service[this.type].price
        sa.quick('trackHeatMap', document.getElementById('pay_btn'), {
          payType,
          level,
          price
        });
        if(!this.isPhone) {
          this.$refs.login_input.focus();
          Toast('请输入正确的手机号');
          return false;
        }
        // if (!this.code) {
        //   this.$refs.code_input.focus();
        //   Toast('请先输入验证码')
        //   return
        // }
        this.handleTestDisabled = true
        let data = {
          deviceId: localStorage.getItem('clientId'),
          userPhone: this.phone,
          // phoneCode: this.code
        };
        api.loginV1(data).then(res => {
          if (res.code === 0) {
            localStorage.sessionId = res.data.sessionId;
            sa.login(res.data.userPhone) // 覆盖distinct_id
            this.test();
          } else {
            this.handleTestDisabled = false
            Toast({
              text: res.msg,
              type: 'warn'
            })
          }
        })
      },
      test() {
        // storage.set('deviceType', this.payType)
        let obj = {
          userPhone: this.phone,
          orderStatus: this.service[this.type].orderStatus,
        }
        api.checkoutCounterV1(obj).then(res => {
          this.handleTestDisabled = false
          if (res.code === 0) {
            this.orderInfo = res.data;

            this.pay();
          } else {
            Toast({
              text: res.msg,
              type: 'warn'
            })
          }
        }).catch(err => {
          Toast({
            text: '网络错误,请稍后重试',
            type: 'error'
          })
        })
      },
      pay() {
        if(this.canPay) {
          this.canPay = false
          setTimeout(() => {
            this.canPay = true
          }, 1000);
          if (isWechat()) {
            // 微信收银台支付
            let data = {
              'callback_url': `${location.origin}/pay`,
              'mchid': '1527581321',
              'notify_url': `${callbackUrl}orderPayjs/callback`,
              'out_trade_no': this.orderInfo.orderId,
              'total_fee': parseInt(this.orderInfo.orderRealAmount)
            }
            let stringA = `callback_url=${data.callback_url}&mchid=${data.mchid}&notify_url=${data.notify_url}&out_trade_no=${data.out_trade_no}&total_fee=${data.total_fee}&key=PDXOdDsQVBx9M8p6`
            data.sign = md5(stringA).toUpperCase()
            window.location.href = `https://payjs.cn/api/cashier?callback_url=${data.callback_url}&mchid=${data.mchid}&notify_url=${data.notify_url}&total_fee=${data.total_fee}&out_trade_no=${data.out_trade_no}&sign=${data.sign}`
          } else {
            console.log('pay');
            // 阿里支付
            let data = {
              payWay: this.payType == 'wap' ? 'ALIPAY' : 'WECHAT',
              orderId: this.orderInfo.orderId,
              returnUrl: `${location.origin}/pay`,
              deviceType: this.payType
            }
            console.log(111);
            api.getPayCodeV1(data).then(res => {
              if(res.code === 0) {
                if(this.payType == 'WEIXIN_H5') {
                  let data_ = JSON.parse(res.data);
                  let redirect_url = encodeURIComponent(data.returnUrl);
                  location.href = `${data_.payUrl}&redirect_url=${redirect_url}`;
                }else {
                  $('#form').html(res.data);
                }
              }else {
                Toast({
                  text: res.msg,
                  type: 'warn'
                })
              }
            }).catch(err => {
              Toast({
                text: '网络错误,请稍后重试',
                type: 'error'
              })
            })
          }
        }else {
          Toast({
            text: '请勿重复点击',
            type: 'warn'
          })
        }
      },
    },
    created() {
      this.getTime();
      // this.setCaptcha();
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 16px;
    padding-bottom: 80px;
    .content {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      .select_tip {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: rgba(0,0,0,0.87);
        line-height: 22px;
        text-align: left;
      }
      .select_box {
        margin-top: 16px;
        .select_tab {
          display: flex;
          align-items: center;
          background: #FAFAFA;
          .select_tab_item {
            position: relative;
            flex: 1;
            height: 78px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .select_tab_icon {
              position: absolute;
              top: 0;
              left: 0;
              width: 32px;
              height: 18px;
            }
            .select_tab_type {
              font-family: PingFangSC-Medium;
              font-size: 20px;
              color: rgba(0,0,0,0.87);
              line-height: 30px;
            }
            .select_tab_price {
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: rgba(0,0,0,0.26);
              text-align: left;
              line-height: 20px;
            }
          }
          .select_tab_item_active {
            background: #F9F3EB;
            .select_tab_type {
              color: #C38E3E;
            }
            .select_tab_price {
              color: #C38E3E;
            }
          }
          .line1 {
            width: 0;
            height: 38px;
            border-left: 1px solid transparent;
          }
          .line1_none {
            border-left: 1px solid rgba(0,0,0,0.12);
          }
        }
        .select_detail {
          padding: 16px 16px 11px;
          box-sizing: border-box;
          width: 100%;
          background: #F9F3EB;
          .select_detail_item {
            margin-top: 4px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: rgba(0,0,0,0.38);
            text-align: left;
            line-height: 18px;
          }
          .select_detail_head {
            margin-top: 0;
            color: rgba(0,0,0,0.87);
          }
          .line2 {
            margin: 10px 0 12px;
            width: 100%;
            height: 0;
            border-top: 1px solid #C38E3E;
          }
          .select_detail_bottom {
            width: 100%;
            display: flex;
            align-items: center;
            .select_detail_bottom_key {
              margin-right: 8px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: rgba(0,0,0,0.87);
              text-align: left;
              line-height: 20px;
            }
            .select_detail_bottom_value {
              font-family: PingFangSC-Medium;
              font-size: 20px;
              color: rgba(0,0,0,0.87);
              line-height: 30px;
              text-align: left;
            }
          }
        }
      }
      .login_box {
        margin-top: 8px;
        padding: 0 16px;
        box-sizing: border-box;
        width: 100%;
        background: #FAFAFA;
        border-radius: 2px;
        .login_item {
          width: 100%;
          height: 56px;
          display: flex;
          align-items: center;
          .login_text {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: left;
            line-height: 20px;
          }
          .login_input {
            margin-left: 22px;
            width: 148px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            text-align: left;
            line-height: 20px;
            background: transparent;
            outline: none;
          }
          .login_code_btn {
            width: 80px;
            height: 32px;
            background: #3F458C;
            border-radius: 2px;
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #FFFFFF;
            line-height: 32px;
            flex-shrink: 1;
          }
          .login_code_btn_send {
            background: #ccc;
          }
        }
        .line4 {
          width: 100%;
          height: 0;
          border-top: 1px solid rgba(0,0,0,0.12);
        }
      }
      .pay_method {
        margin-top: 8px;
        padding: 0 16px;
        box-sizing: border-box;
        width: 100%;
        background: #FAFAFA;
        border-radius: 2px;
        .pay_method_item {
          width: 100%;
          height: 56px;
          display: flex;
          align-items: center;
          .pay_method_icon {
            width: 24px;
            height: 24px;
          }
          .pay_method_text {
            margin-left: 16px;
            flex: 1;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: left;
            line-height: 20px;
          }
          .pay_method_check {
            display: block;
            width: 24px;
            height: 24px;
          }
        }
        .line5 {
          width: 100%;
          height: 0;
          border-top: 1px solid rgba(0,0,0,0.12);
        }
      }
      .argument-agree {
        margin-top: 16px;
        width: 100%;
        display: flex;
        // justify-content: center;
        .check {
          margin-right: 8px;
          width: 16px;
          height: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: rgba(0,0,0,0.26);
          text-align: center;
          line-height: 16px;
        }
      }
    }
    .pay_box {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: #fff;
      .pay {
        width: 100%;
        height: 48px;
        display: flex;
        .pay_price {
          box-sizing: border-box;
          flex: 2;
          display: flex;
          align-items: center;
          background: #3F458C;
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
          .pay_price_text {
            margin-left: 24px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            text-align: left;
            line-height: 20px;
          }
          .pay_price_num {
            margin-left: 8px;
            font-family: PingFangSC-Medium;
            font-size: 20px;
            color: #FFFFFF;
            line-height: 30px;
          }
        }
        .pay_btn {
          flex: 1;
          background: #C38E3E;
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #FFFFFF;
          text-align: center;
          line-height: 48px;
        }
      }
      .pay_bottom {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: rgba(0,0,0,0.38);
        text-align: center;
        line-height: 24px;
      }
    }
    .form {
      height: 0;
      overflow: hidden;
    }
  }
</style>