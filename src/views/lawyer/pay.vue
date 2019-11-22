<template>
	<div class="container">
		<img class="pay_icon" src="@/assets/img_status_done.png">
		<div class="pay_text1">支付成功</div>
		<div class="pay_text2">服务开通中</div>
		<div class="pay_text3">请不要退出当前页面</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			setTimeout(() => {
				this.$router.replace('/result');
			}, 3000)
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
		.pay_text3 {
			margin-top: 8px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: rgba(255,24,24,0.87);
			text-align: center;
			line-height: 20px;
		}
	}
</style>