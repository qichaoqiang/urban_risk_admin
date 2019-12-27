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
				    		<span>{{item.phone}}的公司名称综合评分100分 </span><!-- <span>{{item.time}}秒前</span> -->
				    	</div>
				  	</van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<div class="banner">
			<div class="info">
				<div class="info_item">
					<div class="info_item_title">请输入公司/店铺/品牌名称</div>
					<div class="info_item_name">
						<input type="text" placeholder="完整主体信息系，如北京百度网讯科技有限公司">
					</div>
				</div>
				<div class="info_item">
					<div class="info_item_title">请补充法人/负责人信息</div>
					<div class="info_item_detail">
						<div class="info_item_detail_label">姓名</div>
						<div class="info_item_detail_content">
							<input type="text">
							<div class="info_item_detail_sex_box" @click="sex = 0">
								<div class="info_item_detail_radio" :class="{info_item_detail_radio_active: sex == 0}"></div>
								<div class="info_item_detail_sex">男性</div>
							</div>
							<div class="info_item_detail_sex_box" @click="sex = 1">
								<div class="info_item_detail_radio" :class="{info_item_detail_radio_active: sex == 1}"></div>
								<div class="info_item_detail_sex">女性</div>
							</div>
						</div>
					</div>
					<div class="info_item_detail" style="margin-top: 17px">
						<div class="info_item_detail_label">生辰</div>
						<div class="info_item_detail_content">
							<div class="info_item_detail_select" style="width: 115px" @click="selectTime1">
								<div class="info_item_detail_select_text">{{time1}}</div>
								<img class="info_item_detail_select_arrow" src="@/assets/arrow-down.png">
							</div>
							<div class="info_item_detail_select" style="margin-right: 0" @click="selectTime2">
								<div class="info_item_detail_select_text">{{time2}}</div>
								<img class="info_item_detail_select_arrow" src="@/assets/arrow-down.png">
							</div>
							<div class="info_item_detail_sex_box" style="margin-left: 0" @click="dateType = 0">
								<div class="info_item_detail_radio" :class="{info_item_detail_radio_active: dateType == 0}"></div>
								<div class="info_item_detail_sex">阴历</div>
							</div>
							<div class="info_item_detail_sex_box" @click="dateType = 1">
								<div class="info_item_detail_radio" :class="{info_item_detail_radio_active: dateType == 1}"></div>
								<div class="info_item_detail_sex">阳历</div>
							</div>
						</div>
					</div>
				</div>
				<div class="info_btn" id="info_btn1" @click="register">开始深度测名打分</div>
			</div>
		</div>
		<div class="content">
			<img class="img1" src="@/assets/pic-2.png">
			<div class="info_btn" id="info_btn2" style="margin: 16px auto" @click="register">开始深度测名打分</div>
			<img class="img1" src="@/assets/pic-3.png">
			<div class="info_btn" id="info_btn3" style="margin: 16px auto" @click="register">开始深度测名打分</div>
			<img class="img1" src="@/assets/pic-4.png">
			<div class="compony">© 杭州税牛科技有限公司 浙ICP备19028668号</div>
			<div class="argument-agree" @click="changeAgree">
		        <div class="check" v-if="isAgreement"><img src="@/assets/select_on.png"></div>
		        <div class="check" v-else><img src="@/assets/checkbox_off.png"></div>
		        <span>支付即同意<span @click.stop="goAgreement">《易起名智慧起名服务协议》</span></span>
      		</div>
			<img class="img1" src="@/assets/pic-5.png">
		</div>
		<!-- <div data-agl-cvt="7" class="bottom" id="bottom" :class="{bottom20: isIphoneX}" @click="register(1)">
			<div class="bottom_content">
				<img class="bottom_icon" src="@/assets/button_arrow.gif">
				<div class="bottom_text">
					<div class="bottom_text1">马上领取100套好名字</div>
					<div class="bottom_text2">仅需8.88元 / 限时活动<span>立省990元</span></div>
				</div>
			</div>
		</div> -->
		<div class="model" v-show="loading_pay">
			<van-loading size="40px" vertical>加载中...</van-loading>
		</div>
		<van-popup v-model="showPicker1" position="bottom">
			<van-datetime-picker
				type="date"
				v-model="currentDate"
				:formatter="formatter"
				:minDate="minDate"
				:maxDate="maxDate"
				@cancel="showPicker1 = false"
			    @confirm="onConfirm1"
			/>
		</van-popup>
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker
			    show-toolbar
			    :columns="timeList"
			    @cancel="showPicker2 = false"
			    @confirm="onConfirm2"
			/>
		</van-popup>
		<div class="form" id="form"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Toast, Swipe, SwipeItem, Loading, Lazyload, Picker, Popup, DatetimePicker } from 'vant'
	import { isWechat } from '@/utils/global.js'
	import api from '@/api/api'
	import $ from 'zhangjia-zepto'
	import Swiper from 'swiper'
	Vue.use(Swipe).use(SwipeItem);
	Vue.use(Loading);
	Vue.use(Lazyload);
	Vue.use(Picker);
	Vue.use(Popup);
	Vue.use(DatetimePicker);

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
				sex: 0,
				dateType: 0,
				time1: '1982年1月1日',
				time2: '23:00-00:59 子时',
				showPicker1: false,
				showPicker2: false,
				timeList: ['23:00-00:59 子时', '01:00-02:59 丑时', '03:00-04:59 寅时', '05:00-06:59 卯时', '07:00-08:59 辰时', '09:00-10:59 巳时', '11:00-12:59 午时', '13:00-14:59 未时', '15:00-16:59 申时', '17:00-18:59 酉时', '19:00-20:59 戌时', '21:00-22:59 亥时'],
				minDate: new Date(1900, 0, 1),
      			maxDate: new Date(),
      			currentDate: new Date(1982, 0, 1)
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
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				}else if (type === 'month') {
					return `${value}月`
				}else if (type === 'day') {
					return `${value}日`
				}
				return value;
			},
			selectTime1() {
				this.showPicker1 = true
			},
			selectTime2() {
				this.showPicker2 = true
			},
			onConfirm1(value) {
				this.time1 = `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`
				this.showPicker1 = false
			},
			onConfirm2(value, index) {
				this.time2 = value
				this.showPicker2 = false
			},
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
					time = parseInt((new Date(year, month, day, 10, 0, 0).getTime()  - date.getTime()) / 1000) % 86400
				}else {
					time = parseInt((new Date(year, month, day, 10, 0, 0).getTime() + 86400000  - date.getTime()) / 1000) % 86400
				}
				let hours_ = parseInt(time / 3600);
				let minutes_ = parseInt(time % 3600 / 60);
				let seconds_ = parseInt(time % 60);
				this.countdownTime = `${hours_}时${minutes_}分${seconds_}秒`
			},
			register(e) {
				console.log(e);
            	_hmt.push(['_trackEvent', 'order',  'click',  'amount',  8.88]);

		        if(this.loading_pay) {
		          return false;
		        }
		        if(!this.isAgreement) {
		        	Toast('请先阅读并同意易起名智慧起名服务协议');
		        	return false;
		        }
		        sa.quick('trackHeatMap', e.target, {
		          payType: '微信支付',
		          level: '微信',
		          price: '8.88'
		        });
		        localStorage.setItem('price', '8.88')
		        this.orderStatus = 1;
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
				preventInteractionOnTransition: true,
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
		padding-bottom: 16px;
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
		.info_btn {
			margin: 0 auto;
			width: 296px;
			height: 38px;
			background: #E6543E;
			box-shadow: 0 2px 6px 0 rgba(230,84,62,0.38);
			border-radius: 2px;
			font-family: PingFangSC-Medium;
			font-size: 15px;
			color: #FFFFFF;
			text-align: center;
			line-height: 38px;
		}
		.banner {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 540px;
			background: url('../../assets/home-head.png') top no-repeat;
			background-size: 100%;
			position: relative;
			.info {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				box-sizing: border-box;
				padding: 20px 16px 16px;
				width: 328px;
				background: #FFFFFF;
				box-shadow: 0 4px 6px 0 rgba(0,0,0,0.06);
				border-radius: 8px;
				.info_item {
					margin-bottom: 20px;
					.info_item_title {
						margin-bottom: 12px;
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: rgba(0,0,0,0.87);
						text-align: left;
						line-height: 20px;
					}
					.info_item_name {
						border: 1px solid rgba(0,0,0,0.26);
						border-radius: 2px;
						box-sizing: border-box;
						width: 100%;
						height: 32px;
						input {
							box-sizing: border-box;
							padding-left: 16px;
							width: 100%;
							height: 100%;
							font-family: PingFangSC-Regular;
							font-size: 13px;
							color: rgba(0,0,0,0.87);
							text-align: left;
						}
					}
					.info_item_detail {
						display: flex;
						.info_item_detail_label {
							margin-right: 12px;
							font-family: PingFangSC-Regular;
							font-size: 13px;
							color: rgba(0,0,0,0.60);
							text-align: left;
							line-height: 32px;
							flex-shrink: 0;
						}
						.info_item_detail_content {
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							input {
								margin-right: 8px;
								padding: 0 8px;
								border: 1px solid rgba(0,0,0,0.26);
								border-radius: 2px;
								box-sizing: border-box;
								width: 114px;
								height: 32px;
								font-family: PingFangSC-Regular;
								font-size: 13px;
								color: rgba(0,0,0,0.87);
								text-align: left;
							}
							.info_item_detail_select {
								margin-right: 12px;
								border: 1px solid rgba(0,0,0,0.26);
								border-radius: 2px;
								padding: 0 6px;
								box-sizing: border-box;
								width: 130px;
								height: 32px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								.info_item_detail_select_text {
									font-family: PingFangSC-Regular;
									font-size: 12px;
									color: rgba(0,0,0,0.87);
									text-align: left;
								}
								.info_item_detail_select_arrow {
									width: 9px;
									height: 5px;
								}
							}
							.info_item_detail_sex_box {
								margin-left: 16px;
								height: 32px;
								display: flex;
								align-items: center;
								flex-wrap: nowrap;
								.info_item_detail_radio {
									position: relative;
									width: 16px;
									height: 16px;
									border-radius: 10px;
									border: 1px solid rgba(0,0,0,0.26);
								}
								.info_item_detail_radio_active {
									border: 1px solid #4855B0;
									&:after {
										position: absolute;
										left: 50%;
										top: 50%;
										transform: translate(-50%, -50%);
										content: '';
										width: 10px;
										height: 10px;
										border-radius: 6px;
										background: #4855B0;
									}
								}
								.info_item_detail_sex {
									margin-left: 8px;
									font-family: PingFangSC-Regular;
									font-size: 13px;
									color: rgba(0,0,0,0.60);
									text-align: left;
								}
							}
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
			.swiper-container-free-mode {
				// .swiper-wrapper {
				//     transition-timing-function: linear;
				//     margin: 0 auto;
				// }
			}
			.argument-agree {
				margin-top: 8px;
				margin-bottom: 16px;
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
					overflow: hidden;
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
		padding-bottom: 36px;
	}
</style>
