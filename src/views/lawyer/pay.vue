<template>
	<div class="container">
		<img class="pay_icon" src="@/assets/img_status_done.gif">
		<div class="pay_text2">正在确认支付状态</div>
		<div class="pay_text3">请不要退出当前页面</div>
		<div class="pay_text1">如果您成功支付后仍停留在此页面，请直接点击</div>
		<div class="mask_btn" @click="confirm">
          <van-loading v-if="loading_pay" size="24px" color="#ffffff" vertical></van-loading>
          <span>我已完成支付</span>
        </div>
        <div class="back_btn" @click="back">返回上一页</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Loading } from 'vant'
	import { isIOS } from '@/utils/global'
	Vue.use(Loading)
	export default {
		data() {
			return {
				loading_pay: false
			}
		},
		methods: {
			confirm() {
				if(!this.loading_pay) {
					this.loading_pay = true;
					setTimeout(() => {
						this.$router.replace('/result');
					}, 2000)
				}
		    },
		    back() {
		    	let payWay = localStorage.getItem('payWay');
		    	if(payWay) {
		    		if(payWay == 'ALIPAY') {
			    		history.go(-1);
			    	}else {
			    		history.go(-2);
			    	}
		    	}else {
		    		location.replace(`${location.origin}/pay${location.search}`)
		    	}
		    }
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.pay_icon {
			margin-top: 40px;
			width: 80px;
			height: 80px;
		}
		.pay_text1 {
			margin-top: 12px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: rgba(0,0,0,0.38);
			text-align: left;
			line-height: 20px;
		}
		.pay_text2 {
			margin-top: 8px;
			font-family: PingFangSC-Medium;
			font-size: 20px;
			color: rgba(0,0,0,0.87);
			line-height: 30px;
		}
		.pay_text3 {
			margin-top: 8px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: rgba(255,24,24,0.87);
			text-align: center;
			line-height: 20px;
		}
		.mask_btn {
          margin-top: 8px;
          width: 296px;
          height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          text-align: center;
          line-height: 40px;
          border-radius: 2px;
          box-sizing: border-box;
          background: #c38e3e;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .back_btn {
        	margin-top: 60px;
        	font-family: PingFangSC-Regular;
          	font-size: 14px;
          	text-align: center;
          	color: #193efa;
          	line-height: 40px;
          	text-decoration: underline;
        }
	}
</style>