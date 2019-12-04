<template>
	<div class="container" :class="{container20: isIphoneX}">
		<div class="scrollbars" :class="{scrollbars_no: window360}">
			<div class="scrollbars_icon">最新动态</div>
			<div class="scrollbars_icon2"></div>
			<div class="scrollbars_list">
				<van-swipe style="height: 32px;" :autoplay="2500" vertical :show-indicators="false">
				  	<van-swipe-item v-for="(item, index) in scrollList" :key="index">
				    	<div class="scrollbars_item">
				    		<span>{{item.phone}}开通{{item.content}} </span><span>{{item.time}}秒前</span>
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<div class="banner">
			<div class="guide">
				<div class="guide_item">
					<div class="guide_num">150万+</div>
					<div class="guide_text">解决客户问题</div>
				</div>
				<div class="line1"></div>
				<div class="guide_item">
					<div class="guide_num">99.5%</div>
					<div class="guide_text">客户满意度</div>
				</div>
				<div class="line1"></div>
				<div class="guide_item">
					<div class="guide_num">13.5亿</div>
					<div class="guide_text">挽回用户损失</div>
				</div>
			</div>
		</div>
		<div class="content">
			<!-- <div class="guide1">为全国10,000个家庭提供高端<span>家庭律师服务</span>体验</div>
			<div class="guide2">
				<div class="guide2_title">名额有限 售完即止</div>
				目前已有 <span>8139</span> 个家庭参与活动
			</div> -->
			<div class="price_box">
				<img class="img1 " src="@/assets/title_price.png">
				<div class="price_item price_item_left" :class="{price_item_left_no: window360}">
					<div class="price_intro">
						<div class="price_intro_text">电话咨询</div>
						<div class="price_intro_num">79.9</div>
						<div class="price_intro_yuan">元</div>
					</div>
					<img class="price_bottom" src="@/assets/price_tag_call.png">
				</div>
				<img class="price_center" :class="{price_center_no: window360}" src="@/assets/price_divider.png">
				<div class="price_item price_item_right" :class="{price_item_right_no: window360}">
					<div class="price_intro">
						<div class="price_intro_text">微信咨询</div>
						<div class="price_intro_num">19.9</div>
						<div class="price_intro_yuan">元</div>
					</div>
					<img class="price_bottom" src="@/assets/price_tag_wechat.png">
					<div class="price_intro_guide">
						<div class="price_intro_guide_text2" style="color: rgba(0,0,0,.38)">原价</div>
						<div class="price_intro_guide_text1">49.9元</div>
						<div class="price_intro_guide_text2">-限时优惠-</div>
					</div>
				</div>
			</div>
			<div class="tip">
				<img class="pay_bottom_icon" src="@/assets/ic_protect.png">
        		您的个人信息及咨询内容将严格保密，请放心咨询
			</div>
			<img class="img1" src="@/assets/b_01.png" style="margin-top: 8px;">
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
				    			<div class="example_content_text">电话咨询{{item.num}}次，累计{{item.time}}分钟</div>
				    		</div>
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
			<img class="img1" src="@/assets/b_08.png" style="margin-top: 24px;">
			<img class="img1" src="@/assets/b_09.png">
			<div class="list_box">
				<div class="list">
					<div class="list_item">
						<div class="list_item_left" style="padding-top: 8px;"><span>免费咨询服务差, <br/>收费服务费用高</span></div>
						<div class="list_item_right" style="padding-top: 8px;"><span>单次服务19.9元起,  <br/>价格实惠服务好</span></div>
					</div>
					<div class="line3"></div>
					<div class="list_item">
						<div class="list_item_left"><span>单个律师时间、精力、<br/>能力有限</span></div>
						<div class="list_item_right"><span>多对一组团服务<br/>全领域覆盖</span></div>
					</div>
					<div class="line3"></div>
					<div class="list_item">
						<div class="list_item_left"><span>突发事件无法及时响应</span></div>
						<div class="list_item_right"><span>3分钟响应，<br/>服务实时就位</span></div>
					</div>
					<div class="line3"></div>
					<div class="list_item">
						<div class="list_item_left"><span>缺少服务售后保障</span></div>
						<div class="list_item_right"><span>全程监管用户评价<br/>服务不满意无条件退款</span></div>
					</div>
				</div>
			</div>
			<img class="img1" src="@/assets/b_02.png">
			<img class="img1" src="@/assets/b_03.png">
			<img class="img1" src="@/assets/b_04.png">
			<div class="bg1">
				<div class="countdown">
					<div class="countdown_text">通话中</div>
					<div class="countdown_num">{{this.hour}}:{{this.minutes}}:{{this.seconds}}</div>
					<img class="countdown_gif" src="@/assets/phone.gif">
				</div>
			</div>
			<img class="img1" src="@/assets/b_06.png">
			<img class="img1" src="@/assets/b_10.png">
			<div class="argument-agree" @click="changeAgree">
		        <div class="check" v-if="isAgreement"><img src="@/assets/checkbox_on.png"></div>
		        <div class="check" v-else><img src="@/assets/checkbox_off.png"></div>
		        <span>支付即表示同意<span @click.stop="goAgreement">《犀牛专业律师服务会员协议》</span></span>
      		</div>
			<div class="compony">© 杭州税牛科技有限公司 浙ICP备19028668号</div>
		</div>
		<div class="bottom" :class="{bottom20: isIphoneX}">
			<div class="bottom_btn" data-agl-cvt="7" id="bottom_btn_call" @click="register(2)">
				<img src="@/assets/ic_consult_call.png">
				<span>电话咨询律师</span>
			</div>
			<div class="bottom_btn custom_btn" data-agl-cvt="7" id="bottom_btn_wechat" @click="register(1)">
				<img src="@/assets/ic_consult_wechat.png">
				<span>微信咨询律师</span>
			</div>
		</div>
		<div class="model" v-show="loading_pay">
			<van-loading size="40px" vertical>加载中...</van-loading>
		</div>
		<div class="form" id="form"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Toast, Swipe, SwipeItem, Loading } from 'vant'
	import { isWechat } from '@/utils/global.js'
	import api from '@/api/api'
	import $ from 'zhangjia-zepto'
	Vue.use(Swipe).use(SwipeItem);
	Vue.use(Loading);

	export default {
		name: 'index',
		data() {
			return {
				hour: 1,
				minutes: '21',
				seconds: '00',
				date: '',
				scrollList: [],
				exampleList: [
					{
						title: '“买二手房就像扫雷，律师就是我的排雷兵”',
						name: '刘佳',
						position: '家庭主妇',
						day: 189,
						num: 6,
						time: 127,
						img: require('@/assets/img_user_liujia.png'),
						content: '房屋购买合同审核1次'
					}, {
						title: '“开车有风险，上路须谨慎”',
						name: '彦平',
						position: '私家车主',
						day: 63,
						num: 5,
						time: 35,
						img: require('@/assets/img_user_yanping.png'),
						content: ''
					}, {
						title: '“我会花钱，但不会花冤枉钱”',
						name: '雅琪',
						position: '网购达人',
						day: 196,
						num: 15,
						time: 271,
						img: require('@/assets/img_user_yaqi.png'),
						content: ''
					}
				],
				loading_pay: false,
				type: 'diamond',
				payType: 'WEIXIN_H5',
				orderInfo: {},
				canPay: true,
				isAgreement: true,
			}
		},
		watch: {

		},
		computed: {
			isIphoneX(){
		      	return /iphone/gi.test(navigator.userAgent) && ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414))
		    },
		    window360() {
		    	return window.innerWidth < 360
		    }
		},
		methods: {
			changeAgree() {
				this.isAgreement = !this.isAgreement;
			},
		    goAgreement() {
		        this.$router.push('/agreement');
		    },
			getTime() {
				let time = new Date(new Date().getTime() + 86400000);
				let date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
				this.date = date;
			},
			createScrollData() {
				let list = [];
				let phone = '';
				let time = '';
				let content = '';
				let secondNum = [3, 5, 8, 7];
				let index = 0;
				let secondIndex;
				let contentList = ['19.9元微信咨询服务', '79.9元电话咨询服务'];
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
					time = Math.floor(Math.random() * 49) + 10;
					index = parseInt(i % 2);
					content = contentList[index]; 
					list.push({phone, time, content});
					phone = '';
				}
				this.scrollList = list;
			},
			// customerService() {
			// 	sa.quick('trackHeatMap', document.getElementsByClassName('bottom_btn')[0], {
			// 		scrollTop: document.documentElement.scrollTop,
			// 		rate: Math.ceil((document.documentElement.scrollTop + window.screen.height) / window.screen.height) / Math.ceil((document.body.clientHeight ) / window.screen.height)
			// 	}, () => {
			// 		location.href = 'https://anniu.qiyukf.com/client?k=394edb8ea8c46b5bbe73ed39ad18c3f7&wp=1&sid=3922410&robotShuntSwitch=0';
			// 	});
			// },
			// open() {
			// 	sa.quick('trackHeatMap', document.getElementById('bottom_btn'), {
			// 		scrollTop: document.documentElement.scrollTop,
			// 		rate: Math.ceil((document.documentElement.scrollTop + window.screen.height) / window.screen.height) / Math.ceil((document.body.clientHeight ) / window.screen.height)
			// 	});
			// 	this.$router.push('/order');
			// },
			countdown() {
				let time = 4860;
				let minutes = 0;
				let seconds = 0;
				setInterval(() => {
					time++;
					this.hour = parseInt(time / 60 / 60);
					minutes = parseInt((time % 3600) / 60);
					this.minutes = minutes < 10 ? ('0' + minutes) : minutes;
					seconds = time % 60;
					this.seconds = seconds < 10 ? ('0' + seconds) : seconds;
				}, 1000)
			},
			register(status) {
		        if(this.loading_pay) {
		          return false;
		        }
		        let obj1 = {
		          'WEIXIN_H5': '微信支付',
		          'wap': '支付宝'
		        }
		        let payType = obj1[this.payType];
		        let levelList = ['微信', '电话'];
		        let priceList = ['19.9', '79.9'];
		        let level = levelList[status - 1];
		        let price = priceList[status - 1];
		        sa.quick('trackHeatMap', document.getElementsByClassName('bottom_btn')[2 - status], {
		          payType,
		          level,
		          price
		        });
		        localStorage.setItem('price', price)
		        this.orderStatus = status;
		        this.loading_pay = true;
		        this.handleTestDisabled = true
		        let data = {
		          deviceId: localStorage.getItem('clientId'),
		        };
		        api.loginV1(data).then(res => {
		          if (res.code === 0) {
		            localStorage.sessionId = res.data.sessionId;
		            // sa.login(res.data.userPhone) // 覆盖distinct_id
		            this.test();
		          } else {
		            this.handleTestDisabled = false
		            this.loading_pay = false;
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
		          // userPhone: this.phone,
		          orderStatus: this.orderStatus,
		        }
		        api.checkoutCounterV1(obj).then(res => {
		          this.handleTestDisabled = false
		          if (res.code === 0) {
		          	localStorage.setItem('orderCode', res.data.orderCode)
		            this.orderInfo = res.data;
		            this.pay();
		          } else {
		            this.loading_pay = false;
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
		              'callback_url': `${location.origin}/pay${location.search}&orderCode=${this.orderInfo.orderCode}&price=${localStorage.getItem('price')}`,
		              'mchid': '1527581321',
		              'notify_url': `${callbackUrl}orderPayjs/callback`,
		              'out_trade_no': this.orderInfo.orderId,
		              'total_fee': parseInt(this.orderInfo.orderRealAmount)
		            }
		            let stringA = `callback_url=${data.callback_url}&mchid=${data.mchid}&notify_url=${data.notify_url}&out_trade_no=${data.out_trade_no}&total_fee=${data.total_fee}&key=PDXOdDsQVBx9M8p6`
		            data.sign = md5(stringA).toUpperCase()
		            window.location.href = `https://payjs.cn/api/cashier?callback_url=${data.callback_url}&mchid=${data.mchid}&notify_url=${data.notify_url}&total_fee=${data.total_fee}&out_trade_no=${data.out_trade_no}&sign=${data.sign}`
		          } else {
		            // 阿里支付
		            let data = {
		              payWay: this.payType == 'wap' ? 'ALIPAY' : 'WECHAT',
		              orderId: this.orderInfo.orderId,
		              returnUrl: `${location.origin}/pay${location.search}&orderCode=${this.orderInfo.orderCode}&price=${localStorage.getItem('price')}`,
		              deviceType: this.payType
		            }
		            localStorage.setItem('payWay', data.payWay);
		            api.getPayCodeV1(data).then(res => {
		              this.loading_pay = false;
		              if(res.code === 0) {
		                if(this.payType == 'WEIXIN_H5') {
		                  let data_ = JSON.parse(res.data);
		                  let redirect_url = encodeURIComponent(data.returnUrl);
		                  console.log(`${data_.payUrl}&redirect_url=${redirect_url}`);
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
			this.countdown();
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
		.scrollbars_no {
			padding: 0;
		}
		.banner {
			padding-top: 178px;
			box-sizing: border-box;
			width: 100%;
			height: 250px;
			background: url('../../assets/head.jpg') top no-repeat;
			background-size: 100%;
			.guide {
				margin: 0 auto;
				padding: 9px 0 7px;
				box-sizing: border-box;
				border-radius: 1px;
				box-shadow: 0 4px 8px 0 rgba(0,0,0,0.02);
				width: 328px;
				opacity: 0.95;
				display: flex;
				align-items: center;
				background: #ffffff;
				.guide_item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					.guide_num {
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: #C38E3E;
						text-align: center;
						line-height: 22px;
					}
					.guide_text {
						margin-top: 2px;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(0,0,0,0.38);
						text-align: center;
						line-height: 18px;
					}
				}
				.line1 {
					width: 1px;
					height: 32px;
					background: rgba(0,0,0,0.12);
				}
			}
		}
		.content {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.price_box {
				position: relative;
				margin: 16px auto 0;
				width: 328px;
				height: 130px;
				box-sizing: border-box;
				display: flex;
				.img1 {
					position: absolute;
					top: -16px;
					left: 0;
					width: 100%;
					z-index: 100;
				}
				.price_item {
					position: relative;
					z-index: 99;
					padding-top: 26px;
					flex: 1;
					height: 130px;
					box-sizing: border-box;
					.price_intro {
						display: flex;
						.price_intro_text {
							margin-top: 16px;
							margin-right: 4px;
							font-family: PingFangSC-Regular;
							font-size: 11px;
							color: #C38E3E;
							text-align: left;
							line-height: 18px;
							transform: scale(0.9);
							white-space: nowrap;
						}
						.price_intro_num {
							margin-right: 2px;
							font-family: PingFangSC-Medium;
							font-size: 28px;
							color: #C38E3E;
							line-height: 40px;
						}
						.price_intro_yuan {
							margin-top: 14px;
							font-family: PingFangSC-Medium;
							font-size: 14px;
							color: #C38E3E;
							text-align: left;
							line-height: 20px;
						}
					}
					.price_bottom {
						width: 146px;
						height: 20px;
					}
				}
				.price_item_left {
					padding-top: 42px;
					padding-left: 16px;
					background: #F9F3EB;
					.price_bottom {
						position: absolute;
						top: 84px;
						left: -2px;
					}
				}
				.price_item_right {
					padding-right: 16px;
					background: #EEEFF5;
					.price_intro {
						justify-content: flex-end;
						.price_intro_text {
							color: #3F458C;
						}
						.price_intro_num {
							color: #3F458C;
						}
						.price_intro_yuan {
							color: #3F458C;
						}
					}
					.price_bottom {
						position: absolute;
						top: 66px;
						right: -2px;
					}
					.price_intro_guide {
						margin-top: 30px;
						line-height: 18px;
						display: flex;
						justify-content: flex-end;
						.price_intro_guide_text1 {
							font-family: PingFangSC-Regular;
							font-size: 11px;
							color: rgba(0,0,0,0.38);
							text-align: left;
							transform: scale(0.9);
							white-space: nowrap;
						}
						.price_intro_guide_text2 {
							font-family: PingFangSC-Medium;
							font-size: 13px;
							color: rgba(224,12,12,0.87);
							text-align: left;
							white-space: nowrap;
						}
					}
				}
				.price_item_left_no {
					padding-left: 4px;
				}
				.price_item_right_no {
					padding-left: 4px;
				}
				.price_center {
					width: 40px;
					height: 130px;
					flex-shirnk: 0;
				}
				.price_center_no {
					width: 20px;
				}
			}
			.tip {
				margin-top: 4px;
				width: 324px;
				height: 30px;
				border-radius: 1px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #3F458C;
				text-align: center;
				line-height: 18px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #EEEFF5;
				img {
					margin-right: 2px;
					width: 16px;
					height: 16px;
				}
			}
			.img1 {
				width: 100%;
			}
			.bg1 {
				padding-top: 60px;
				box-sizing: border-box;
				width: 100%;
				height: 500px;
				background: url('../../assets/b_05.png') top no-repeat;
				background-size: 100%;
				.countdown {
					position: relative;
					margin: 0 auto;
					padding-top: 12px;
					box-sizing: border-box;
					width: 180px;
					height: 120px;
					background: rgba(47, 51, 98, 0.8);
					border-radius: 8px;
					.countdown_text {
						opacity: 0.6;
						font-family: PingFangSC-Medium;
						font-size: 12px;
						color: #FFFFFF;
						text-align: center;
						line-height: 20px;
					}
					.countdown_num {
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #FFFFFF;
						text-align: center;
						line-height: 20px;
					}
					.countdown_gif {
						position: absolute;
						left: 50%;
						bottom: -20px;
						transform: translateX(-50%);
						width: 180px;
						height: 80px;
					}
				}
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
				padding-top: 8px;
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
						text-align: right;
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
				margin-top: 16px;
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
				margin-top: 24px;
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
			.argument-agree {
				margin-top: 16px;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
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
		        	font-family: PingFangSC-Regular;
		        	font-size: 12px;
		        	color: rgba(0,0,0,0.38);
		        	text-align: center;
		        	line-height: 16px;
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
				flex: 1;
				height: 48px;
				background: #C38E3E;
				box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
				font-family: PingFangSC-Medium;
				font-size: 15px;
				color: #FFFFFF;
				line-height: 48px;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					margin-right: 4px;
					width: 24px;
					height: 24px;
				}
			}
			.custom_btn {
				background: #3F458C;
			}
		}
		.bottom20 {
			background: #ffffff;
			padding-bottom: 20px;
		}
		.model {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 2000;
			// padding-top: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}
		.form {
	      	height: 0;
	      	overflow: hidden;
	    }
	}
	.container20 {
		padding-bottom: 92px;
	}
</style>