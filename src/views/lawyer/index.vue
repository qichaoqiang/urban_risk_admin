<template>
	<div class="container" :class="{container20: isIphoneX}">
		<!-- <div class="notice">
			<img class="notice_icon" src="@/assets/home-notice.png">
			<div class="notice_text">目前已经有{{userNum}}人参与活动</div>
		</div> -->
		<div class="scrollbars" :class="{scrollbars_no: window360}">
			<div class="scrollbars_icon">最新动态</div>
			<div class="scrollbars_icon2"></div>
			<div class="scrollbars_list">
				<van-swipe style="height: 32px;" :autoplay="2500" vertical :show-indicators="false">
				  	<van-swipe-item v-for="(item, index) in scrollList" :key="index">
				    	<div class="scrollbars_item">
				    		<span>{{item.phone}} 已购买企业名称策划套餐 </span><span>{{item.time}}秒前</span>
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<div class="banner">
			<div class="banner_intro">
				<div class="banner_intro_item">
					<div class="banner_intro_text">品牌意识强化活动优惠</div>
					<div class="banner_intro_line"></div>
				</div>
				<div class="banner_intro_item">
					<div class="banner_intro_line" style="width: 74px;"></div>
					<div class="banner_intro_text">将于<span>{{countdownTime}}</span>后截止</div>
				</div>
			</div>
			<div class="banner_price">
				<div class="banner_price_else">市场价999元起</div>
				<div class="banner_price_reduce">立省930元</div>
				<div class="banner_price_now">现仅需</div>
			</div>
			<div class="price">
				<div class="price_num">69</div>
				<div class="price_yuan">元</div>
			</div>
		</div>
		<div class="content">
			<img class="img1" src="@/assets/head_02.png">
			<img class="img1" src="@/assets/body_use.jpg">
			<img class="img1" src="@/assets/body_compare.jpg">
			<img class="img1" src="@/assets/body_advan.png">
			<img class="img1" src="@/assets/body_commt.png">
			<div class="result2"><span>13128</span>位客户已使用易起名服务</div>
			<div class="comment_box">
				<div class="comment_title">
					<div class="comment_title_line"></div>
					<div class="comment_title_text">近一周客户真实评价</div>
					<div class="comment_title_line"></div>
				</div>
				<div class=" comment">
					<div class="swiper-container comment_list">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<div class="comment_item">
									<div class="comment_item_title">
										<div class="comment_item_title_icon"></div>
										<div class="comment_item_title_text">订单号为 150****1139 的王先生</div>
										<div class="comment_item_title_line"></div>
									</div>
									<div class="comment_item_content">真的不敢想象，一个名字竟然有这么多的讲究，易起名的科学起名，传统理论与现代理论相结合，五行搭配合理，值得推荐！  大数据系统分析很到位，信息资源全面，堪称行业典范。商标、域名、推广方方面面都考虑到了，真正得到的是一套方案，不单单是一个名字，强烈推荐！</div>
								</div>
								<div class="comment_item">
									<div class="comment_item_title">
										<div class="comment_item_title_icon"></div>
										<div class="comment_item_title_text">订单号为 156****1820 的刘先生</div>
										<div class="comment_item_title_line"></div>
									</div>
									<div class="comment_item_content">起名完全符合了我的要求,朗朗上口,寓意美好，内涵丰富，会推荐给有需要的朋友</div>
								</div>
								<div class="comment_item">
									<div class="comment_item_title">
										<div class="comment_item_title_icon"></div>
										<div class="comment_item_title_text">订单号为 139****6230 的叶女士</div>
										<div class="comment_item_title_line"></div>
									</div>
									<div class="comment_item_content">起的名字非常好，下次有朋友需要的话还会来找大师起名的。服务态度也很好，赞一个</div>
								</div>
								<div class="comment_item">
									<div class="comment_item_title">
										<div class="comment_item_title_icon"></div>
										<div class="comment_item_title_text">订单号为 178****8367 的张先生</div>
										<div class="comment_item_title_line"></div>
									</div>
									<div class="comment_item_content">名字起的好，下次再来，目前已经注册成功，服务过程很流畅，取得名字也非常满意，很幸运的一次就注册成功，没有反复，太省心了，哈哈。</div>
								</div>
								<div class="comment_item">
									<div class="comment_item_title">
										<div class="comment_item_title_icon"></div>
										<div class="comment_item_title_text">订单号为 159****3382 的何女士</div>
										<div class="comment_item_title_line"></div>
									</div>
									<div class="comment_item_content">在网上对比了下，你们是性价比最高的，价格不高，服务好，名字的评估是最全最科学的，名字不但很符合八字，又考虑到了传播和商标域名的申请，很厉害，下次有需要还会找你们</div>
								</div>
								<div class="comment_item">
									<div class="comment_item_title">
										<div class="comment_item_title_icon"></div>
										<div class="comment_item_title_text">订单号为 130****7221 的李女士</div>
										<div class="comment_item_title_line"></div>
									</div>
									<div class="comment_item_content">是我注册这么多家公司过程中，起名最省心的一次了，100套方案里选5个，简直不要太容易，还能直接分享给老板一起挑，实在太感谢贵公司了。每个备选名字都有很完善的分析介绍，老板看了对我很满意，下次我会介绍朋友过来的！！ 赞</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="compony">© 杭州税牛科技有限公司 浙ICP备19028668号</div>
			<div class="argument-agree" @click="changeAgree">
		        <div class="check" v-if="isAgreement"><img src="@/assets/checkbox_on.png"></div>
		        <div class="check" v-else><img src="@/assets/checkbox_off.png"></div>
		        <span>支付即同意<span @click.stop="goAgreement">《易起名智慧起名服务协议》</span></span>
      		</div>
		</div>
		<div class="bottom" id="bottom" :class="{bottom20: isIphoneX}" @click="register(1)">
			<div class="bottom_content">
				<img class="bottom_icon" src="@/assets/button_arrow.gif">
				<div class="bottom_text">
					<div class="bottom_text1">马上领取100套好名字</div>
					<div class="bottom_text2">仅需69元 / 限时活动<span>立省930元</span></div>
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
	import { Toast, Swipe, SwipeItem, Loading, Lazyload } from 'vant'
	import { isWechat } from '@/utils/global.js'
	import api from '@/api/api'
	import $ from 'zhangjia-zepto'
	import Swiper from 'swiper'
	Vue.use(Swipe).use(SwipeItem);
	Vue.use(Loading);
	Vue.use(Lazyload);

	export default {
		name: 'index',
		data() {
			return {
				hour: 1,
				minutes: '21',
				seconds: '00',
				countdownTime: '',
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
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours();
				let time = '';
				// parseInt(date.getTime() / 1000 - 7200) % 86400
				if(hours < 10) {
					time = parseInt((new Date(`${year}-${month}-${day} 10:00:00`).getTime()  - date.getTime()) / 1000) % 86400
				}else {
					time = parseInt((new Date(`${year}-${month}-${day} 10:00:00`).getTime() + 86400000  - date.getTime()) / 1000) % 86400
				}
				let hours_ = parseInt(time / 3600);
				let minutes_ = parseInt(time % 3600 / 60);
				let seconds_ = parseInt(time % 60);
				this.countdownTime = `${hours_}时${minutes_}分${seconds_}秒`
			},
			register(status) {

            _hmt.push(['_trackEvent', 'order',  'click',  'amount',  69.00]);

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
		        // let priceList = ['69', '79.9'];
		        // let level = levelList[status - 1];
		        // let price = priceList[status - 1];
		        // sa.quick('trackHeatMap', document.getElementsByClassName('bottom_btn')[2 - status], {
		        //   payType,
		        //   level,
		        //   price
		        // });
		        sa.quick('trackHeatMap', document.getElementById('bottom'), {
		          payType: '微信支付',
		          level: '微信',
		          price: '69'
		        });
		        localStorage.setItem('price', '69')
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
			setInterval(() => {
				this.countdown();
			}, 1000)
		    new Swiper('.swiper-container', {
		    	autoplay: {
					delay:0
				},
		        loop:true,//循环
		        speed:40000,//滚动速度
		        direction : 'vertical',
		    });
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 36px;
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
			background: #ff6044;
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
			background: rgba(0, 0, 0, 0.6);
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
		// .scrollbars {
		// 	margin-top: 8px;
		// 	width: 312px;
		// 	padding: 0 16px;
		// 	box-sizing: border-box;
		// 	height: 30px;
		// 	background: rgba(0, 0, 0, 0.1);
		// 	display: flex;
		// 	align-items: center;
		// 	background: #F2F3FA;
		// 	border-radius: 15px;
		// 	.scrollbars_icon {
		// 		margin-right: 8px;
		// 		width: 20px;
		// 		height: 20px;
		// 	}
		// 	.scrollbars_list {
		// 		flex: 1;
		// 		height: 100%;
		// 		.scrollbars_item {
		// 			width: 100%;
		// 			height: 30px;
		// 			font-family: PingFangSC-Regular;
		// 	        font-size: 12px;
		// 	        color: #555F86;
		// 	        text-align: left;
		// 	        line-height: 30px;
		// 	        display: flex;
		// 	        justify-content: space-between;
		// 	        align-items: center;
		// 		}
		// 	}
		// }
		// .scrollbars_no {
		// 	padding: 0;
		// }
		.banner {
			box-sizing: border-box;
			padding-top: 209px;
			width: 100%;
			height: 360px;
			background: url('../../assets/head_01.png') top no-repeat;
			background-size: 100%;
			position: relative;
			.banner_intro {
				box-sizing: border-box;
				padding-left: 16px;
				width: 100%;
				.banner_intro_item {
					display: flex;
					align-items: center;
					.banner_intro_text {
						font-family: PingFangSC-Medium;
						font-size: 12px;
						color: #FFFFFF;
						text-align: left;
						line-height: 18px;
						span {
							color: #ffe208;
						}
					}
					.banner_intro_line {
						margin: 0 12px;
						width: 90px;
						height: 1px;
						background: rgba(255,255,255,0.70);
					}
				}
			}
			.banner_price {
				margin-top: 19px;
				box-sizing: border-box;
				padding-left: 29px;
				width: 100%;
				display: flex;
				align-items: center;
				.banner_price_else {
					margin-right: 8px;
					font-family: PingFangSC-Regular;
					font-size: 11px;
					color: rgba(0,0,0,0.38);
					text-align: right;
					line-height: 18px;
					text-decoration: line-through;
				}
				.banner_price_reduce {
					margin-right: 8px;
					width: 74px;
					height: 20px;
					background-image: linear-gradient(136deg, #F8826D 6%, #E93D1C 100%);
					box-shadow: 0 2px 4px 0 rgba(255,55,17,0.20);
					border-radius: 10px;
					font-family: PingFangSC-Medium;
					font-size: 12px;
					color: #FFFFFF;
					text-align: center;
					line-height: 20px;
				}
				.banner_price_now {
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #D56242;
					text-align: left;
					line-height: 20px;
				}
			}
			.price {
				position: absolute;
				top: 215px;
				right: 12px;
				width: 104px;
				height: 104px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: url('../../assets/price_bg.png') top no-repeat;
				background-size: 100%;
				.price_num {
					font-family: PingFangSC-Medium;
					font-size: 36px;
					color: #FFFFFF;
					font-weight: bold;
				}
				.price_yuan {
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: #FFFFFF;
				}
			}
		}
		.content {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.swiper-container-free-mode {
				// .swiper-wrapper {
				//     transition-timing-function: linear;
				//     margin: 0 auto;
				// }
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
			.img1 {
				width: 100%;
			}
			.result2 {
				width: 223px;
				height: 32px;
				background: #4A4B77;
				border-radius: 16px;
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #ffffff;
				text-align: center;
				line-height: 32px;
				span {
					color: #FF8E6D;
				}
			}
			.comment_box {
				margin-top: 8px;
				box-sizing: border-box;
				padding: 16px 20px;
				width: 336px;
				background: linear-gradient(180deg, #FAFAFA 0%, #FEFEFE 100%);
				.comment_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.comment_title_line {
						width: 75px;
						height: 1px;
						background: #D56242;
					}
					.comment_title_text {
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #D56242;
						text-align: center;
						line-height: 20px;
					}
				}
				.comment {
					width: 100%;
					height: 272px;
					border-radius: 4px;
					overflow: scroll;
					.comment_list {
						height: 600px;
						.swiper-wrapper {
							transition-timing-function: linear;
							.swiper-slide {
								margin-top: 16px;
								width: 100%;
								height: 600px;
								.comment_item {
									margin-top: 16px;
									width: 100%;
									height: auto;
									.comment_item_title {
										display: flex;
										align-items: center;
										.comment_item_title_icon {
											margin-right: 8px;
											width: 4px;
											height: 12px;
											background: #4A4B77;
										}
										.comment_item_title_text {
											margin-right: 5px;
											font-family: PingFangSC-Medium;
											font-size: 13px;
											color: #4A4B77;
											line-height: 16px;
										}
										.comment_item_title_line {
											flex: 1;
											height: 1px;
											background: rgba(0,0,0,0.12);
										}
									}
									.comment_item_content {
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
				margin: 0 16px;
				width: 40px;
				height: 40px;
			}
			.bottom_content {
				width: 100%;
				height: 64px;
				display: flex;
				align-items: center;
				background-image: linear-gradient(225deg, #FFAD6A 0%, #FF3711 100%);
				box-shadow: 0 -8px 16px 0 rgba(255,55,17,0.20);
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
						span {
							margin-left: 4px;
							padding: 0 8px;
							background: rgba(255, 255, 255, 0.8);
							border-radius: 9px;
							font-family: PingFangSC-Medium;
							color: #F2583A;
						}
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
