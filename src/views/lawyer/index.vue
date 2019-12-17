<template>
	<div class="container" :class="{container20: isIphoneX}">
		<div class="notice">
			<img class="notice_icon" src="@/assets/home-notice.png">
			<div class="notice_text">目前已经有{{userNum}}人参与活动</div>
		</div>
		<div class="banner">
			
		</div>
		<div class="content">
			<!-- <div class="login_box">
				<div class="login_item">
					<div class="login_key">称呼<span>*</span></div>
					<div class="login_input_box">
						<img class="login_icon" src="@/assets/home-mine.png">
						<input class="login_input" type="text" v-model="name" placeholder="请输入姓名">
					</div>
				</div>
				<div class="login_item">
					<div class="login_key">号码<span>*</span></div>
					<div class="login_input_box">
						<img class="login_icon" src="@/assets/home-phone.png">
						<input class="login_input" type="text" v-model="phone" placeholder="请输入手机号">
					</div>
				</div>
			</div> -->
			<!-- <div class="guide1">为全国10,000个家庭提供高端<span>家庭律师服务</span>体验</div>
			<div class="guide2">
				<div class="guide2_title">名额有限 售完即止</div>
				目前已有 <span>8139</span> 个家庭参与活动
			</div> -->
			<img class="img1" src="@/assets/home-hours.png">
			<div class="price_box">
				<div class="price_item price_item_left">
					<div class="price_intro">
						<div class="price_intro_text">现仅需</div>
						<div class="price_intro_num">29.9</div>
						<div class="price_intro_yuan">元</div>
					</div>
					<div class="price_bottom">
						<span>原价199元</span>
					</div>
					<!-- <img class="price_bottom" src="@/assets/price_tag_call.png"> -->
				</div>
				<img class="price_center" src="@/assets/price_line.png">
				<div class="price_item price_item_right">
					<div class="price_intro">
						<div class="price_intro_text">优惠截止时间<br>{{this.date}}</div>
					</div>
					<!-- <img class="price_bottom" src="@/assets/price_tag_wechat.png"> -->
					<!-- <div class="price_intro_guide">
						<div class="price_intro_guide_text2" style="color: rgba(0,0,0,.38)">原价49.9元</div>
						<div class="price_intro_guide_text2">-限时优惠-</div>
					</div> -->
				</div>
			</div>
			<img class="img1" src="@/assets/home-icothree.png">
			<div class="scrollbars" :class="{scrollbars_no: window360}">
				<img class="scrollbars_icon" src="@/assets/success-on.png">
				<div class="scrollbars_list">
					<van-swipe style="height: 100%;" :autoplay="2500" vertical :show-indicators="false">
					  	<van-swipe-item v-for="(item, index) in scrollList" :key="index">
					    	<div class="scrollbars_item">{{item.name}}{{item.sex}}，{{item.phone}}，{{item.time}}分钟前已成功购买</div>
					  	</van-swipe-item>
					</van-swipe>
				</div>
			</div>
			<img class="img1" src="@/assets/home-3.png">
			<div class="example_list">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<img class="swiper-slide" src="@/assets/shuffling-1.png">
						<img class="swiper-slide" src="@/assets/shuffling-2.png">
						<img class="swiper-slide" src="@/assets/shuffling-3.png">
					</div>
					<div class="swiper-button-next"></div>
    				<div class="swiper-button-prev"></div>
				</div>
			</div>
			<img class="img1" src="@/assets/home-4.png">
			<div class="argument-agree" @click="changeAgree">
		        <div class="check" v-if="isAgreement"><img src="@/assets/chest-on.png"></div>
		        <div class="check" v-else><img src="@/assets/checkbox_off.png"></div>
		        <span>支付即同意<span @click.stop="goAgreement">《易起名智慧起名服务协议》</span></span>
      		</div>
			<!-- <div class="compony">© 杭州税牛科技有限公司 浙ICP备19028668号</div> -->
		</div>
		<div class="bottom" id="bottom" :class="{bottom20: isIphoneX}" @click="register(1)">
			<div class="bottom_content">
				<img class="bottom_icon" src="@/assets/wechat-pay.png">
				<div class="bottom_text">
					<div class="bottom_text1">开始预约起名服务，24小时响应</div>
					<div class="bottom_text2">仅需29.9元，专家起名，起到满意为止！</div>
				</div>
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
	import Swiper from 'swiper'
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
				name: '',
				phone: '',
				userNum: '',
				nameList: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '楮', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闽', '席', '季', '麻', '强', '贾', '路', '娄', '危', '江', '童', '颜', '郭', '梅', '盛', '林', '刁', '锺', '徐', '丘', '骆', '高', '夏', '蔡', '田', '樊', '胡', '凌', '霍', '虞', '万', '支', '柯', '昝', '管', '卢', '莫', '经', '房', '裘', '缪', '干', '解', '应', '宗', '丁', '宣', '贲', '邓', '郁', '单', '杭', '洪', '包', '诸', '左', '石', '崔', '吉', '钮', '龚', '程', '嵇', '邢', '滑', '裴', '陆', '荣', '翁', '荀', '羊', '於', '惠', '甄', '麹', '家', '封', '芮', '羿', '储', '靳', '汲', '邴', '糜', '松', '井', '段', '富', '巫', '乌', '焦', '巴', '弓', '牧', '隗', '山', '谷', '车', '侯', '宓', '蓬', '全', '郗', '班', '仰', '秋', '仲', '伊', '宫', '宁', '仇', '栾', '暴', '甘', '斜', '厉', '戎', '祖', '武', '符', '刘', '景', '詹', '束', '龙', '叶', '幸', '司', '韶', '郜', '黎', '蓟', '薄', '印', '宿', '白', '怀', '蒲', '邰', '从', '鄂', '索', '咸', '籍', '赖', '卓', '蔺', '屠', '蒙', '池', '乔', '阴', '郁', '胥', '能', '苍', '双', '闻', '莘', '党', '翟', '谭', '贡', '劳', '逄', '姬', '申', '扶', '堵', '冉', '宰', '郦', '雍', '郤', '璩', '桑', '桂', '濮', '牛', '寿', '通', '边', '扈', '燕', '冀', '郏', '浦', '尚', '农', '温', '别', '庄', '晏', '柴', '瞿', '阎', '充', '慕', '连', '茹', '习', '宦', '艾', '鱼', '容', '向', '古', '易', '慎', '戈', '廖', '庾', '终', '暨', '居', '衡', '步', '都', '耿', '满', '弘', '匡', '国', '文', '寇', '广', '禄', '阙', '东', '欧', '殳', '沃', '利', '蔚', '越', '夔', '隆', '师', '巩', '厍', '聂', '晁', '勾', '敖', '融', '冷', '訾', '辛', '阚', '那', '简', '饶', '空', '曾', '毋', '沙', '乜', '养', '鞠', '须', '丰', '巢', '关', '蒯', '相', '查', '后', '荆', '红', '游', '竺', '权', '逑', '盖', '益', '桓', '公', '仉', '督', '晋', '楚', '阎', '法', '汝', '鄢', '涂', '钦', '岳', '帅', '缑', '亢', '况', '后', '有', '琴', '归', '海', '墨', '哈', '谯', '笪', '年', '爱', '阳', '佟', '商', '牟', '佘', '佴', '伯', '赏'],
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
			getNum() {
				let time = new Date();
				let date = time.getDate();
				let day = time.getDay();
				let hours = time.getHours();
				hours = hours < 7 ? (hours + 24) : hours;
				let initNum = date * day % 100 + 1000;
				for(let i = 7; i < hours; i++) {
					initNum += day * hours % 10 + 10;
				}
				this.userNum = initNum;
			},
			createScrollData() {
				let list = [];
				let phone = '';
				let time = '';
				let name = '';
				let sex = '';
				let secondNum = [3, 5, 8, 7];
				let index = 0;
				let secondIndex;
				// let contentList = ['19.9元微信咨询服务', '79.9元电话咨询服务'];
				let sexList = ['先生', '女士'];
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
					name = this.nameList[Math.floor(Math.random() * 441) + 1]
					sex = sexList[index]; 
					list.push({phone, time, name, sex});
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
		        if(!this.isAgreement) {
		        	Toast('请先阅读并同意易起名智慧起名服务协议');
		        	return false;
		        }
		        // let obj1 = {
		        //   'WEIXIN_H5': '微信支付',
		        //   'wap': '支付宝'
		        // }
		        // let payType = obj1[this.payType];
		        // let levelList = ['微信', '电话'];
		        // let priceList = ['29.9', '79.9'];
		        // let level = levelList[status - 1];
		        // let price = priceList[status - 1];
		        // sa.quick('trackHeatMap', document.getElementsByClassName('bottom_btn')[2 - status], {
		        //   payType,
		        //   level,
		        //   price
		        // });
		        sa.quick('trackHeatMap', document.getElementsByClassName('bottom')[0], {
		          payType: '微信支付',
		          level: '微信',
		          price: '29.9'
		        });
		        localStorage.setItem('price', '29.9')
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
		              'callback_url': `${location.origin}/pay${location.search}${location.search ? '&' : '?'}orderCode=${this.orderInfo.orderCode}&price=${localStorage.getItem('price')}`,
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
		              returnUrl: `${location.origin}/pay${location.search}${location.search ? '&' : '?'}orderCode=${this.orderInfo.orderCode}&price=${localStorage.getItem('price')}`,
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
		                  // location.href = `${data_.payUrl}&redirect_url=${redirect_url}`;
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
			this.getNum();
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
			new Swiper('.swiper-container', {
				navigation: {
			      	nextEl: '.swiper-button-next',
			      	prevEl: '.swiper-button-prev',
			    },
		      	autoplay: {
		        	delay: 2500,
		        	disableOnInteraction: false,
		      	},
		      	loop : true,
		    });
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 78px;
		.notice {
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
			background: rgba(211,140,16,0.60);
			.notice_icon {
				width: 18px;
				height: 18px;
			}
			.notice_text {
				margin-left: 8px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(255,255,255,0.80);
				line-height: 18px;
			}
		}
		.scrollbars {
			margin-top: 8px;
			width: 312px;
			padding: 0 16px;
			box-sizing: border-box;
			height: 30px;
			background: rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			background: #F2F3FA;
			border-radius: 15px;
			.scrollbars_icon {
				margin-right: 8px;
				width: 20px;
				height: 20px;
			}
			.scrollbars_list {
				flex: 1;
				height: 100%;
				.scrollbars_item {
					width: 100%;
					height: 30px;
					font-family: PingFangSC-Regular;
			        font-size: 12px;
			        color: #555F86;
			        text-align: left;
			        line-height: 30px;
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
			box-sizing: border-box;
			width: 100%;
			height: 230px;
			background: url('../../assets/home-banner.png') top no-repeat;
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
			.login_box {
				padding: 0 24px;
				box-sizing: border-box;
				width: 100%;
				.login_item {
					margin-bottom: 12px;
					&:first-child {
						margin-bottom: 16px;
					}
					.login_key {
						font-family: PingFangSC-Regular;
						font-size: 13px;
						color: rgba(0,0,0,0.60);
						text-align: left;
						line-height: 18px;
						span {
							color: #F2583A;
						}
					}
					.login_input_box {
						margin-top: 8px;
						border: 1px solid #B9B0A3;
						border-radius: 4px;
						padding: 0 16px;
						width: 100%;
						height: 38px;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						.login_icon {
							margin-right: 12px;
							width: 20px;
							height: 20px;
						}
						.login_input {
							flex: 1;
							font-family: PingFangSC-Regular;
							font-size: 13px;
							color: rgba(0,0,0,0.87);
							text-align: left;
							line-height: 18px;
						}
					}
				}
			}
			.argument-agree {
				padding: 0 24px;
				box-sizing: border-box;
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
			.price_box {
				position: relative;
				margin: 0 auto;
				padding: 0 24px;
				width: 312px;
				height: 100px;
				box-sizing: border-box;
				display: flex;
				background: #F9F3EB;
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
					height: 130px;
					box-sizing: border-box;
					.price_intro {
						display: flex;
						.price_intro_text {
							margin-top: 16px;
							margin-right: 4px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.87);
							text-align: right;
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
						display: flex;
						align-items: center;
						img {
							margin-right: 2px;
							width: 16px;
							height: 16px;
						} 
						span {
							font-family: PingFangSC-Medium;
							font-size: 11px;
							color: rgba(0,0,0,0.26);
							text-align: left;
							line-height: 18px;
							white-space: nowrap;
						}
						// width: 146px;
						// height: 20px;
					}
					// .price_bottom {
					// 	width: 146px;
					// 	height: 20px;
					// }
				}
				.price_item_left {
					flex: 1;
					.price_bottom {
						span {
							text-decoration: line-through;
						}
					}
				}
				.price_item_right {
					.price_intro {
						justify-content: flex-end;
						.price_intro_text {
							margin-top: 12px;
							color: rgba(0,0,0,0.38);
						}
						.price_intro_num {
							color: #3F458C;
						}
						.price_intro_yuan {
							color: #3F458C;
						}
					}
					.price_bottom {
						justify-content: flex-end;
						span {
							font-family: PingFangSC-Medium;
							font-size: 16px;
							color: rgba(0,0,0,0.60);
							line-height: 22px;
						}
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
					padding-left: 6px;
				}
				.price_item_right_no {
					padding-right: 6px;
				}
				.price_center {
					margin-top: 27px;
					margin-right: 30px;
					width: 16px;
					height: 56px;
					flex-shirnk: 0;
				}
				.price_center_no {
					width: 20px;
				}
				.price_line2 {
					position: absolute;
					top: 94px;
					left: 50%;
					transform: translateX(-50%);
					width: 280px;
					height: 0;
					border-top: 1px solid #C38E3E;
				}
				.price_text {
					position: absolute;
					top: 104px;
					right: 24px;
					font-family: PingFangSC-Regular;
					font-size: 11px;
					color: rgba(0,0,0,0.38);
					text-align: right;
					line-height: 18px;
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
				margin-top: 16px;
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
				height: 192px;
				background: #FFFFFF;
				border: 1px solid rgba(0,0,0,0.04);
				box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
				border-radius: 1px;
				box-sizing: border-box;
				.swiper-container {
					--swiper-navigation-color: #B9B0A3;
					--swiper-navigation-size: 18px;
					.swiper-button-next {
						right: 8px;
						outline: none;
					}
					.swiper-button-prev {
						left: 8px;
						outline: none;
					}
					.swiper-wrapper {
						.swiper-slide {

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
			z-index: 1000;
			bottom: 0;
			width: 100%;
			height: 62px;
			// .bottom_btn {
			// 	flex: 1;
			// 	height: 48px;
			// 	background: #C38E3E;
			// 	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.04);
			// 	font-family: PingFangSC-Medium;
			// 	font-size: 15px;
			// 	color: #FFFFFF;
			// 	line-height: 48px;
			// 	display: flex;
			// 	justify-content: center;
			// 	align-items: center;
			// 	img {
			// 		margin-right: 4px;
			// 		width: 24px;
			// 		height: 24px;
			// 	}
			// }
			.custom_btn {
				background: #3F458C;
			}
			.bottom_icon {
				margin-left: 24px;
				margin-right: 16px;
				width: 36px;
				height: 36px;
			}
			.bottom_content {
				width: 100%;
				height: 64px;
				display: flex;
				align-items: center;
				background: #F2583A;
				box-shadow: 0 -8px 16px 0 rgba(0,0,0,0.04);
				.bottom_text {
					.bottom_text1 {
						font-family: PingFangSC-Medium;
						font-size: 18px;
						color: #FFFFFF;
						line-height: 30px;
						text-align: left;
					}
					.bottom_text2 {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(255,255,255,0.70);
						line-height: 18px;
						text-align: left;
					}
				}
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
		padding-bottom: 98px;
	}
</style>