<template>
	<div class="container">
		<img class="pay_icon" src="@/assets/img_status_error.png">
		<div class="pay_text1">系统异常, 服务开通失败</div>
		<div class="pay_text2">如果您已成功支付，<br/>所支付款项已全额原路退回</div>
		<div class="line1"></div>
		<div class="pay_text3">
			请添加客服微信，确认退款进展
		</div>
		<img class="pay_qrcode" src="@/assets/QR-codeSample.png">
	</div>
</template>

<script>
	export default {
		data() {
			return {

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
			margin-top: 16px;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: rgba(0,0,0,0.87);
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
		.line1 {
			margin-top: 40px;
			width: 296px;
			height: 0;
			border-top: 1px solid rgba(0,0,0,0.12);
		}
		.pay_text3 {
			margin-top: 16px;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: rgba(0,0,0,0.87);
			text-align: center;
			line-height: 18px;
		}
		.pay_qrcode {
			margin-top: 16px;
			width: 160px;
			height: 160px;
		}
	}
</style>