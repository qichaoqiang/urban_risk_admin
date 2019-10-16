<template>
  <div class="pay" >
    <div class="balanceContainer">
      <div class="balance">
        <h4>当前账户余额</h4>
        <div class="numLine">
          <div class="balanceNum">
            <span class="num">{{data.balance}}</span>
            <span class="txt">金币</span>
          </div>
          <div class="givingNum">
            <span class="num">{{data.bonusBalance}}</span>
            <span class="txt">赠币</span>
          </div>
        </div>
        <span class="first">优选余额支付</span>
        <div class="reCharge" @click="reCharge">
          <span>立即充值</span>
          <img src="@/assets/ic_recharge_arrow_1@3x.png" alt="">
        </div>
      </div>
      <div class="rechargeLine">
        <div class="label">
          <span>支付所需金额</span>
        </div>
        <span style="font-family: PingFangSC-Medium;font-size: 14px;color: #FF7F4A;text-align: center;">200金币</span>
      </div>
    </div>
    <div class="typeContainer">
      <div class="typeContent">
        <h4>支付方式</h4>
        <div class="typeLine">
          <div class="label">
            <img src="@/assets/ic_balance@3x.png" alt="">
            <span>余额支付</span>
          </div>
          <img style="dispay:block;width: 18px;height: 18px;"  src="@/assets/ic_choice@3x.png" alt="">
        </div>
      </div>
    </div>
    <div class="promptContainer">
      <div class="promptContent">
        <p style="font-size: 12px;">提示：<br />1.支付默认优先选择余额支付</p>
      </div>
    </div>
    <div class="footer">
      <span class="nextBtn" @click="pay">下一步</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Button, Dialog } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import sa from 'sa-sdk-javascript'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
export default {
  data () {
    return {
      data: {
        balance: 0,
        bonusBalance: 0
      },
      intentionId: 1,
    }
  },
  created () {
    let intentionId = localStorage.getItem('intentionId')
    if(intentionId){
      this.intentionId = intentionId
    }
    api.merchantDetail().then(res => {
      console.log(res)
      if(res.code == 0){
        this.data = res.data
        if(!res.data.bonusBalance){
          this.data.bonusBalance = 0
        }
      }
    })
  },
  methods: {
    binding () {
      
    },
    pay () {
      let data = {
        intentionId: this.intentionId
      }
      Dialog.confirm({
        title: '提示',
        message: '是否确认报价？',
        confirmButtonColor: '#FF7F4A'
      }).then(() => {
        api.intentionPurchase(data).then(res => {
          console.log(res)
          if(res.code == 0){
            Toast('购买成功')
            this.$router.push({ path: '/payResult' })
          }else {
            this.success = false
            Toast(res.data.msg)
          }
        })
        .catch(err => {
          Toast(err.data.msg)
        })
      }).catch(() => {
        Toast('取消购买')
      });
    },
    reCharge() {
      this.$router.push({ path: '/reCharge' })
      localStorage.setItem('page','pay')
    },
  }
}
</script>
<style lang="scss" scoped>
.pay{
  width: 100%;
  .balanceContainer{
    width: 100%;
    background: #ffffff;
    padding-top: 16px;
    .balance{
      width: 328px;
      position: relative;
      padding-top: 16px;
      padding-bottom: 10px;
      background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      box-shadow: 0 8px 16px 0 #FBEADD;
      border-radius: 4px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
      h4{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(255,255,255,0.74);
        text-align: left;
        margin-left: 16px;
      }
      .first{
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: rgba(255,255,255,0.74);
        text-align: left;
        margin-left: -10px;
        margin-top: 12px;
        -webkit-transform : scale(0.84,0.84);
        display: block;
      }
      .reCharge{
        position: absolute;
        display: flex;
        align-items: center;
        top: 12px;
        right: 12px;
        img{
          display: block;
          width: 12px;
          height: 12px;
          margin-left: 6px;
        }
        span{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          text-align: center;
        }
      }
      .numLine{
        display: flex;
        align-items: center;
        margin-left: 16px;
        margin-top: 10px;
        .balanceNum,.givingNum{
          display: flex;
          align-items: flex-end;
          .num{
            font-family: PingFangSC-Medium;
            font-size: 30px;
            color: #FFFFFF;
            text-align: center;
            line-height: 30px;
            display: block;
            margin-right: 4px;
          }
          .txt{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            display: block;
            line-height: 1.5;
          }
        }
        .balanceNum{
          border-right: 1px solid #ffffff;
          padding-right: 12px;
        }
        .givingNum{
          padding-left: 12px;
        }
      }
    }
    .rechargeLine{
      width: 328px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0,0,0,0.04);
      .label{
        display: flex;
        align-items: center;
        span{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(0,0,0,0.60);
          text-align: center;
        }
      }
    }
  }
  .typeContainer{
    width: 100%;
    background: #ffffff;
    .typeContent{
      width: 328px;
      padding-top: 20px;
      margin-left: auto;
      margin-right: auto;
      h4{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        text-align: left;
      }
      .typeLine{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        height: 48px;
        .label{
          display: flex;
          align-items: center;
          img{
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: left;
            line-height: 20px;
          }
        }
      }
    }
  }
  .promptContainer{
    width: 100%;
    background: #ffffff;
    .promptContent{
      width: 328px;
      text-align: left;
      margin-left: auto;
      margin-right: auto;
      margin-top: 8px;
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.26);
        line-height: 22px;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .nextBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 52px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #FFFFFF;
      background: #FF7F4A;
    }
  }
}
</style>
