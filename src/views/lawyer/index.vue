<template>
	<div class="container">
		<div class="scrollbars">
			<div class="scrollbars_icon">最新动态</div>
			<div class="scrollbars_list">
				<van-swipe style="height: 32px;" :autoplay="2500" vertical :show-indicators="false">
				  	<van-swipe-item v-for="(item, index) in scrollList" :key="index">
				    	<div class="scrollbars_item">
				    		<span>{{item.phone}} 收到律师起草的合同 </span><span style="color: #ffad71;">{{item.time}}分钟前</span>
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<img class="banner" src="@/assets/ic_recomd.png"></img>
		<div class="bottom">
			<div class="bottom_btn custom_btn">咨询客服</div>
			<div class="bottom_btn">开通服务</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Toast, Swipe, SwipeItem } from 'vant'
	Vue.use(Swipe).use(SwipeItem);

	export default {
		data() {
			return {
				scrollList: []
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			createScrollData() {
				let list = [];
				let phone = '';
				let time = '';
				let secondNum = [3, 5, 8, 7];
				let secondIndex;
				for(let i = 0; i < 100; i++) {
					phone += 1;
					secondIndex = Math.floor(Math.random() * 3);
					phone += secondNum[secondIndex];
					for(let j = 0; j < 9; j++) {
						if(j > 0 && j < 5) {
							phone += '*';
						}else {
							phone += Math.floor(Math.random() * 10);
						}
					}
					time = Math.floor(Math.random() * 29) + 1;
					list.push({phone, time});
					phone = '';
				}
				this.scrollList = list;
			}
		},
		created() {
			this.createScrollData();
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 32px;
		.scrollbars {
			position: fixed;
			top: 0;
			padding: 0 16px;
			box-sizing: border-box;
			width: 100%;
			height: 32px;
			background: rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			.scrollbars_icon {
				margin-right: 8px;
				border: 1px solid #ffad71;
				border-radius: 2px;
				padding: 0 2px;
				font-family: PingFangSC-Regular;
		        font-size: 13px;
		        color: #ffad71;
		        text-align: left;
		        line-height: 20px;
			}
			.scrollbars_list {
				flex: 1;
				height: 100%;
				.scrollbars_item {
					width: 100%;
					height: 32px;
					font-family: PingFangSC-Regular;
			        font-size: 13px;
			        color: rgba(0, 0, 0, 0.38);
			        text-align: left;
			        line-height: 32px;
			        display: flex;
			        justify-content: space-between;
			        align-items: center;
				}
			}
		}
		.banner {
			width: 100%;
			height: 180px;
		}
		.bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			.bottom_btn {
				flex: 1;
				height: 48px;
				background: #333;
				font-family: PingFangSC-Medium;
		        font-size: 16px;
		        color: #fff;
		        text-align: center;
		        line-height: 48px;
			}
			.custom_btn {
				background: #ccc;
				color: #000;
			}
		}
	}
</style>