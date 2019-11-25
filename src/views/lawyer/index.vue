<template>
	<div class="container">
		<div class="scrollbars">
			<div class="scrollbars_icon">最新动态</div>
			<div class="scrollbars_icon2"></div>
			<div class="scrollbars_list">
				<van-swipe style="height: 32px;" :autoplay="2500" vertical :show-indicators="false">
				  	<van-swipe-item v-for="(item, index) in scrollList" :key="index">
				    	<div class="scrollbars_item">
				    		<span>{{item.phone}} 收到律师起草的合同 </span><span>{{item.time}}分钟前</span>
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<div class="banner">
			<div class="guide">
				<div class="guide_title">• 限时特惠 法制文明进万家活动 •</div>
				<div class="guide_content">
					<div class="guide_left">原价<br/>13800元/年</div>
					<div class="line1"></div>
					<div class="guide_right">
						<div class="guide_right_text">现仅需</div>
						<div class="guide_right_price">999.00<span>元/年起</span></div>
						<div class="line2"></div>
						<div class="guide_right_time">活动截止时间: 2019-11-20</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<img class="img1" src="@/assets/b_01.png">
			<div class="guide1">为全国10,000个家庭提供1年高端<span>家庭律师服务</span>体验</div>
			<div class="guide2">
				<div class="guide2_title">名额有限 售完即止</div>
				目前已有 <span>8139</span> 个家庭参与活动
			</div>
			<img class="img1" src="@/assets/b_02.png" style="margin-top: 16px;">
			<img class="img1" src="@/assets/b_03.png">
			<div class="list_box">
				<div class="list">
					<div class="list_item">
						<div class="list_item_left" style="padding-top: 8px;"><span>按时按次计费, <br/>收费高</span></div>
						<div class="list_item_right" style="padding-top: 8px;"><span>全年仅需999,  <br/>不限时不限次</span></div>
					</div>
					<div class="line3"></div>
					<div class="list_item">
						<div class="list_item_left"><span>单个律师时间、精力、<br/>能力有限</span></div>
						<div class="list_item_right"><span>多对一组团服务<br/>全领域覆盖</span></div>
					</div>
					<div class="line3"></div>
					<div class="list_item">
						<div class="list_item_left"><span>突发事件无法及时响应</span></div>
						<div class="list_item_right"><span>全天候响应，<br/>随时随地随身</span></div>
					</div>
					<div class="line3"></div>
					<div class="list_item">
						<div class="list_item_left"><span>缺少服务售后保障</span></div>
						<div class="list_item_right"><span>全程监管用户评价<br/>服务不满意无条件退款</span></div>
					</div>
				</div>
				<img class="img2" src="@/assets/b_04.png">
			</div>
			<img class="img1" src="@/assets/b_05.png" style="margin-top: 8px">
			<div class="select_detail">
				<div class="select_detail_item select_detail_head">
					<div class="select_detail_key">权益项目</div>
					<div class="select_detail_key1">服务价值</div>
					<div class="select_detail_value" style="color: rgba(0,0,0,0.87);">细则</div>
				</div>
				<div class="line2"></div>
				<div class="select_detail_item">
					<div class="select_detail_key">电话/网上法律咨询服务</div>
					<div class="select_detail_key1">不限时不限次</div>
					<div class="select_detail_value">200元/次</div>
				</div>
				<div class="select_detail_item">
					<div class="select_detail_key">起草/审查/修改法律文书</div>
					<div class="select_detail_key1">3份</div>
					<div class="select_detail_value">800元/份</div>
				</div>
				<div class="select_detail_item">
					<div class="select_detail_key">全天候专属VIP客服</div>
					<div class="select_detail_key1">1名</div>
					<div class="select_detail_value">3000元/年</div>
				</div>
				<div class="select_detail_item">
					<div class="select_detail_key">1+N律师组团服务</div>
					<div class="select_detail_key1">3-5名</div>
					<div class="select_detail_value">10000元/年</div>
				</div>
			</div>
			<div class="equity">
				<div class="equity_content">
					<div class="equity_content_text1">权益总价值 > </div>
					<div class="equity_content_text2">20000元</div>
				</div>
			</div>
			<img class="img1" src="@/assets/b_06.png" style="margin-top: 24px;">
			<div class="price">
				<div class="price_left">原价<br/>13800元/年</div>
				<div class="price_right">
					<div class="price_right_text1">现仅需</div>
					<div class="price_right_text2">899.00<span>元/年起</span></div>
				</div>
			</div>
			<img class="img1" src="@/assets/b_07.png">
			<div class="example_title">
				<div class="line4"></div>
				<div class="example_title_content"><span>135468</span>位用户正在使用</div>
				<div class="line4"></div>
			</div>
			<div class="example_list">
				<van-swipe :autoplay="2500" :show-indicators="false">
				  	<van-swipe-item v-for="(item, index) in exampleList" :key="index">
				    	<div class="example_item">
				    		<img class="example_img" :src="item.img">
				    		<div class="example_content">
				    			<div class="example_content_title">{{item.title}}</div>
				    			<div class="example_content_name">—— {{item.name}}  | {{item.position}}</div>
				    			<div class="line5"></div>
				    			<div class="example_content_text">已开通服务 {{item.day}} 天</div>
				    			<div class="example_content_text">电话咨询{{item.num}}次，累计{{item.time}}分钟</div>
				    			<div class="example_content_text">{{item.content}}</div>
				    		</div>
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
			<img class="img1" src="@/assets/b_08.png">
			<img class="img1" src="@/assets/b_09.png">
			<div class="compony">© 杭州税牛科技有限公司 浙ICP备123456-1</div>
		</div>
		<div class="bottom">
			<div class="bottom_btn custom_btn" @click="customerService">咨询客服</div>
			<div class="bottom_btn" @click="open">开通服务</div>
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
				scrollList: [],
				exampleList: [
					{
						title: '“买二手房就像扫雷，家庭律师就是我的排雷兵”',
						name: '刘佳',
						position: '家庭主妇',
						day: 189,
						num: 6,
						time: 127,
						img: require('@/assets/head.png'),
						content: '房屋购买合同审核1次'
					}, {
						title: '“开车有风险，上路须谨慎”',
						name: '彦平',
						position: '私家车主',
						day: 63,
						num: 5,
						time: 35,
						img: require('@/assets/ic_pay_alipay.png'),
						content: ''
					}, {
						title: '“我会花钱，但不会花冤枉钱”',
						name: '雅琪',
						position: '网购达人',
						day: 196,
						num: 15,
						time: 271,
						img: require('@/assets/ic_pay_alipay.png'),
						content: ''
					}
				]
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
			},
			customerService() {
				sa.quick('trackHeatMap', document.getElementsByClassName('bottom_btn')[0], {
					scrollTop: document.documentElement.scrollTop,
					rate: Math.ceil((document.documentElement.scrollTop + window.screen.height) / window.screen.height) / Math.ceil((document.body.clientHeight ) / window.screen.height)
				});
				location.href = 'https://anniu.qiyukf.com/client?k=394edb8ea8c46b5bbe73ed39ad18c3f7&wp=1&sid=3922410&robotShuntSwitch=0';
			},
			open() {
				sa.quick('trackHeatMap', document.getElementsByClassName('bottom_btn')[1], {
					scrollTop: document.documentElement.scrollTop,
					rate: Math.ceil((document.documentElement.scrollTop + window.screen.height) / window.screen.height) / Math.ceil((document.body.clientHeight ) / window.screen.height)
				});
				this.$router.push('/order');
			}
		},
		created() {
			localStorage.setItem('utm_source', this.$route.query.utm_source || '');
	        localStorage.setItem('utm_medium', this.$route.query.utm_medium || '');
	        localStorage.setItem('originUrl', location.href);
			sa.registerPage({
		        $utm_medium: localStorage.getItem('utm_medium') || '',
		        $utm_source: localStorage.getItem('utm_source') || '',
	      	});
			sa.quick("autoTrack")
			this.createScrollData();
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 72px;
		.scrollbars {
			position: fixed;
			z-index: 1000;
			top: 0;
			padding: 0 16px;
			box-sizing: border-box;
			width: 100%;
			height: 36px;
			background: rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			background: rgba(63, 69, 140, 0.6);
			.scrollbars_icon {
				margin-right: 6px;
				padding: 0 2px;
				font-family: PingFangSC-Regular;
		        font-size: 13px;
		        color: #ffad71;
		        text-align: left;
		        line-height: 18px;
			}
			.scrollbars_icon2 {
				margin-right: 8px;
				position: relative;
				width: 1px;
				height: 14px;
				background: #F1BE71;
				&:after {
					position: absolute;
					top: 50%;
					left: 1px;
					transform: translateY(-50%);
					content: '';
					width: 0;
					height: 0;
					border: 3px solid transparent;
					border-left-color: #F1BE71;
				}
			}
			.scrollbars_list {
				flex: 1;
				height: 100%;
				.scrollbars_item {
					width: 100%;
					height: 36px;
					font-family: PingFangSC-Regular;
			        font-size: 12px;
			        color: rgb(255,255,255);
			        text-align: left;
			        line-height: 36px;
			        display: flex;
			        justify-content: space-between;
			        align-items: center;
				}
			}
		}
		.banner {
			padding-top: 214px;
			box-sizing: border-box;
			width: 100%;
			height: 360px;
			background: url('../../assets/head.png') top no-repeat;
			background-size: 100%;
			.guide {
				margin: 0 auto;
				padding: 12px 16px;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
				border-radius: 1px;
				width: 328px;
				.guide_title {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #49559D;
					text-align: center;
					line-height: 18px;
				}
				.guide_content {
					margin-top: 8px;
					width: 100%;
					display: flex;
					align-items: center;
					.guide_left {
						padding: 0 16px 4px 8px;
						align-self: flex-end;
						font-family: PingFangSC-Regular;
						font-size: 13px;
						color: rgba(0,0,0,0.38);
						text-align: left;
						line-height: 20px;
					}
					.line1 {
						width: 4px;
						height: 80px;
						background: #3F458C;
					}
					.guide_right {
						margin-left: 16px;
						flex: 1;
						.guide_right_text {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.87);
							text-align: left;
							line-height: 18px;
						}
						.guide_right_price {
							font-family: PingFangSC-Medium;
							font-size: 30px;
							color: #C38E3E;
							text-align: left;
							line-height: 36px;
							span {
								font-family: PingFangSC-Medium;
								font-size: 14px;
								color: #C38E3E;
								text-align: left;
								line-height: 20px;
							}
						}
						.line2 {
							margin-top: 4px;
							width: 100%;
							height: 1px;
							background: rgba(0,0,0,0.12);
						}
						.guide_right_time {
							margin-top: 4px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.60);
							text-align: left;
							line-height: 18px;
						}
					}
				}
			}
		}
		.content {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.img1 {
				width: 100%;
			}
			.guide1 {
				margin-top: 16px;
				width: 328px;
				background: #3F458C;
				box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
				border-radius: 1px;
				font-family: PingFangSC-Medium;
				font-size: 13px;
				color: #FFFFFF;
				text-align: center;
				line-height: 36px;
				span {
					color: #F1BE71;
				}
			}
			.guide2 {
				margin-top: 24px;
				position: relative;
				border: 1px solid #5C619E;
				border-radius: 18px;
				box-sizing: border-box;
				width: 240px;
				height: 36px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(0,0,0,0.87);
				text-align: center;
				line-height: 34px;
				.guide2_title {
					position: absolute;
					top: -9px;
					left: 50%;
					transform: translateX(-50%);
					padding: 0 4px;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(0,0,0,0.60);
					text-align: left;
					line-height: 18px;
					background: #fff;
				}
				span {
					color: #C38E3E;
				}
			}
			.list_box {
				position: relative;
				padding-top: 79px;
				width: 100%;
				.list {
					margin: 0 auto;
					border: 1px solid rgba(0,0,0,0.12);
					border-radius: 1px;
					box-sizing: border-box;
					width: 328px;
					.list_item {
						display: flex;
						.list_item_left {
							flex: 1;
							height: 56px;
							padding-left: 24px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.60);
							text-align: left;
							line-height: 18px;
							display: flex;
							align-items: center;
						}
						.list_item_right {
							flex: 1;
							height: 56px;
							background: #F9F3EB;
							padding-left: 21px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.60);
							text-align: left;
							line-height: 18px;
							display: flex;
							align-items: center;
						}
					}
					.line3 {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						width: 298px;
						height: 1px;
						background: rgba(0,0,0,0.12);
					}
				}
				.img2 {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
				}
			}
			.select_detail {
				padding: 0 16px;
				box-sizing: border-box;
				width: 100%;
				.select_detail_item {
					margin-top: 4px;
					padding: 0 8px;
					box-sizing: border-box;
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(0,0,0,0.38);
					text-align: left;
					line-height: 18px;
					.select_detail_key {
						text-align: left;
						width: 134px;
					}
					.select_detail_key1 {
						text-align: center;
						flex-grow: 1;
					}
					.select_detail_value {
						text-align: right;
						width: 66px;
						color: #C38E3E;
					}
				}
				.select_detail_head {
					margin-top: 0;
					font-size: 13px;
					color: rgba(0,0,0,0.87);
				}
				.line2 {
					margin: 10px 0 12px;
					width: 100%;
					height: 0;
					border-top: 1px solid rgba(0,0,0,0.60);
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
			.equity {
				margin-top: 25px;
				position: relative;
				border: 1px solid #C38E3E;
				border-radius: 8px;
				box-sizing: border-box;
				width: 328px;
				height: 16px;
				.equity_content {
					position: absolute;
					top: -15px;
					right: 12px;
					padding: 0 4px;
					display: flex;
					align-items: center;
					background: #fff;
					.equity_content_text1 {
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: rgba(0,0,0,0.87);
						text-align: left;
						line-height: 20px;
					}
					.equity_content_text2 {
						font-family: PingFangSC-Medium;
						font-size: 20px;
						color: #C38E3E;
						line-height: 30px;
					}
				}
			}
			.price {
				width: 328px;
				height: 77px;
				display: flex;
				align-items: center;
				background: url('../../assets/img_price_bg.png') top no-repeat;
				background-size: 100%;
				.price_left {
					padding-left: 15px;
					box-sizing: border-box;
					width: 133px;
					font-family: PingFangSC-Regular;
					font-size: 11px;
					color: rgba(255,255,255,0.70);
					text-align: left;
					line-height: 18px;
				}
				.price_right {
					.price_right_text1 {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(255,255,255,0.70);
						text-align: left;
						line-height: 18px;
					}
					.price_right_text2 {
						font-family: PingFangSC-Medium;
						font-size: 24px;
						color: #FFFFFF;
						line-height: 30px;
						span {
							font-family: PingFangSC-Medium;
							font-size: 14px;
							color: #FFFFFF;
							text-align: left;
							line-height: 20px;
						}
					}
				}
			}
			.example_title {
				width: 338px;
				display: flex;
				align-items: center;
				.line4 {
					flex-grow: 1;
					height: 2px;
					background: #5C619E;
				}
				.example_title_content {
					margin: 0 4px;
					width: 240px;
					height: 36px;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #FFFFFF;
					text-align: center;
					line-height: 36px;
					background: #3F458C;
					border-radius: 20px;
					span {
						color: #F1BE71;
					}
				}
			}
			.example_list {
				margin-top: 24px;
				width: 336px;
				height: 190px;
				background: #FFFFFF;
				border: 1px solid rgba(0,0,0,0.04);
				box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
				border-radius: 1px;
				box-sizing: border-box;
				.example_item {
					width: 336px;
					padding: 24px 24px 16px 16px;
					box-sizing: border-box;
					display: flex;
					.example_img {
						margin-right: 16px;
						width: 90px;
						height: 120px;
						background: #F5F5F5;
						border-radius: 45px;
					}
					.example_content {
						flex: 1;
						.example_content_title {
							font-family: PingFangSC-Medium;
							font-size: 16px;
							color: #5C619E;
							line-height: 22px;
							text-align: left;
						}
						.example_content_name {
							margin-top: 8px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #3F458C;
							text-align: right;
							line-height: 18px;
						}
						.line5 {
							margin: 10px 0;
							width: 100%;
							height: 1px;
							background: rgba(0,0,0,0.12);
						}
						.example_content_text {
							margin-top: 2px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.60);
							text-align: right;
							line-height: 18px;
						}
					}
				}
			}
			.compony {
				margin-top: 12px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(0,0,0,0.38);
				text-align: center;
				line-height: 18px;
			}
		}
		.bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			.bottom_btn {
				flex: 2;
				height: 48px;
				background: #C38E3E;
				box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
				font-family: PingFangSC-Medium;
				font-size: 15px;
				color: #FFFFFF;
				line-height: 48px;
			}
			.custom_btn {
				flex: 1;
				background: #3F458C;
			}
		}
	}
</style>