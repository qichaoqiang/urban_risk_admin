<template>
	<div class="container" id="overview" style="min-width: 1200px; height: 100%">
		<div class="mapDiv">
			<div id="mapDiv" style="width: 100%; height: 100%"></div>
		</div>
		<tool :levelList="levelList"></tool>
		<!-- <div class="level_box" ref="level_box">
			<div class="level_item" v-for="item in levelList" :key="item.color" style="width: 112px; height: 28px;">
				<div class="level_item_name">{{item.name}}</div>
				<div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
			</div>
		</div> -->
		<!-- <div class="level_box" ref="level_box">
			<div class="level_item" v-for="item in iconList" :key="item.color" style="width: 112px; height: 28px;">
				<div class="level_item_name">{{item.name}}</div>
				<div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
			</div>
		</div> -->
		<div class="left" id="left" ref="left">
			<!-- <risk-detail :data="riskInfo" :currentRisk="currentRisk"  @drawRiskSource="handleDrawRiskSource"></risk-detail> -->
			<div class="left_box" ref="left_box">
				<div class="left_item">
					<title-top name="选择行业"></title-top>
					<div class="trade_list">
						<trade ref="trade_list" :data="tradeList" left="32px" :level="1"></trade>
					</div>
				</div>
				<!-- <div class="left_item" ref="areaBox">
					<div class="line" @mousedown="drag"></div>
					<title-top name="选择区域"></title-top>
					<div class="header_select_dropdown_list">
						<div class="header_select_dropdown_item">
							<div class="check" :class="{selected: cityName == '全部'}" @click="selectArea('all')"></div>
							<span :class="{active: cityName == '全部'}">全部</span>
						</div>
	    				<div class="header_select_dropdown_item" v-for="item in cityList" :key="item.dropName">
	    					<div class="check" :class="{selected: cityName == item.name}" @click="selectArea(item.dropName, item.zoom)"></div>
	    					<span :class="{active: cityName == item.name}">{{item.name}}</span>
	    				</div>
	    				<div class="header_select_dropdown_item">
	    					<div class="check"></div>
	    					<span>名胜区</span>
	    				</div>
					</div>
				</div> -->
				<!-- <left-box :area="cityName"></left-box> -->
			</div>
			<div class="drag_line" @mousedown="dragLeft"></div>
			<!-- <div class="close" @click="handleSelectLeft(false)"></div> -->
		</div>
		<!-- <div class="select_trade" v-show="!showRight" @click="handleSelectRight(true)" style="padding: 12px 0 4px; width: 88px;">
			<img src="@/assets/ic_consult_call.png" style="width
			40px; height: 40px">
			<div class="select_trade_text" style="margin: 12px 0 4px; font-size: 14px; line-height: 20px;">行业分类</div>
			<Icon type="ios-arrow-down" size="12px" color="#ffffff"/>
		</div> -->
		<div class="trade_box" id="right">
			<div class="right_box">
				<title-top :name="`${cityName}${$store.state.industry ? $store.state.industry.fxylbmc : ''}风险等级分布图`" :area="area"></title-top>
				<div>
					<overview></overview>
				</div>
				<title-top name="区域风险排序"></title-top>
				<div class="trade_order_popup">
					<div class="trade_order_content">
						<trade-order :qyfxList="qyfxList" :cityName="cityName"></trade-order>
					</div>
				</div>
			</div>
			<!-- <div class="close" @click="handleSelectRight(false)"></div> -->
		</div>
		<div class="city_model" id="city_model" v-if="overCity" :style="{left: `${cityModelLeft}px`, top: `${cityModelTop}px`}">
			<div class="city_name">{{overCity.name}}</div>
			<!-- fxyList -->
			<div class="city_level" v-for="(item, index) in levelList" :key="item.color">
				<div class="city_level_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
				<div class="city_level_name">{{item.name}}：{{overCity.fxyList[index]}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
  	// 引入柱状图组件
  	require('echarts/lib/chart/radar')
  	// 引入提示框和title组件
  	require('echarts/lib/component/tooltip')
	import { getScript } from '@/utils/global'
	import { getIntersection } from '@/utils/tool'
	import axios from '@/api/axios'
	import $ from 'jquery'
	import tradeList from '@/utils/trade'
	import api from '@/api/api'
	import mixins from './mixins'
	import quyu from '@/common/js/quyu_overview'
	import storage from 'good-storage'
	import TitleTop from '@/components/common/title'
	import Tool from './components/tool'
	import Overview from '@/components/left/overview'
	import TradeOrder from '@/components/left/tradeOrder'
	import Trade from '@/components/right/trade'
	import all_county from '@/common/area/all.json'
	import minhou from '@/common/area/mh.json'
	export default {
		name: 'poi',
		components: {
			TitleTop,
			Tool,
			Overview,
			TradeOrder,
			Trade
		},
		mixins: [mixins, quyu],
		data() {
			return {
				showCityList: false,
				showInfoModel: false,
				fxyInfo: {},
				cityName: '全部',
				username: storage.get('username'),
				area: '全部',
				showLeft: false,
				showRight: false,
				tradeList,
				reset: false,
				map: null, // 地图
				polygon: null, // 面对象
				cityList: [],
				riskPoints: [
					{
						id: 1,
						x:  30.26005300,
						y: 119.94697500,
						type: '化学生产企业',
						type_: '危险化学品',
						level: 0,
						riskMatter: 122,
						iconUrl: require('../../assets/1.png'),
						device: 192,
						people: 101,
						environment:29,
						hasRadar: false
					}, {
						id: 2,
						x:  30.11,
						y: 119.67,
						type: '公共设施',
						type_: '公共设施',
						level: 1,
						riskMatter: 88,
						iconUrl: require('../../assets/2.png'),
						device: 138,
						people: 81,
						environment: 47,
						hasRadar: false
					}, {
						id: 3,
						x:  30.29,
						y: 120.33,
						type: '化学生产企业',
						type_: '危险化学品',
						level: 2,
						riskMatter: 122,
						iconUrl: require('../../assets/3.png'),
						device: 192,
						people: 101,
						environment:29,
						hasRadar: false
					}, {
						id: 4,
						x:  30.01,
						y: 119.55,
						type: '公共设施',
						type_: '公共设施',
						level: 3,
						riskMatter: 88,
						iconUrl: require('../../assets/4.png'),
						device: 138,
						people: 81,
						environment: 47,
						hasRadar: false
					}, {
						id: 5,
						x:  30.32,
						y: 120.30,
						type: '化学生产企业',
						type_: '危险化学品',
						level: 0,
						riskMatter: 122,
						iconUrl: require('../../assets/1.png'),
						device: 192,
						people: 101,
						environment:29,
						hasRadar: false
					}, {
						id: 6,
						x:  30.31,
						y: 119.87,
						type: '公共设施',
						type_: '公共设施',
						level: 1,
						riskMatter: 88,
						iconUrl: require('../../assets/2.png'),
						device: 138,
						people: 81,
						environment: 47,
						hasRadar: false
					}, {
						id: 7,
						x:  30.33,
						y: 120.44,
						type: '化学生产企业',
						type_: '危险化学品',
						level: 2,
						riskMatter: 122,
						iconUrl: require('../../assets/3.png'),
						device: 192,
						people: 101,
						environment:29,
						hasRadar: false
					}, {
						id: 8,
						x:  30.04,
						y: 119.37,
						type: '公共设施',
						type_: '公共设施',
						level: 3,
						riskMatter: 88,
						iconUrl: require('../../assets/4.png'),
						device: 138,
						people: 81,
						environment: 47,
						hasRadar: false
					}
				],
				iconList: [{
		            name: '风险点',
		            id: 1,
		            color: '#F25E5E',
		        }, 
		        // {
		        //     name: '重大风险源',
		        //     id: 2,
		        //     color: '#F49852',
		        // }
		        ],
				levelList: [{
		            name: '重大风险',
		            color: '#F25E5E',
		            value: 0,
		            color_: 'red',
		            selected: true
		        }, {
		            name: '较大风险',
		            color: '#F49852',
		            value: 0,
		            color_: 'orange',
		            selected: true
		        }, {
		            name: '一般风险',
		            color: '#EFE850',
		            value: 0,
		            color_: 'yellow',
		            selected: true
		        }, {
		            name: '低风险',
		            color: '#1C86F3',
		            value: 0,
		            color_: 'blue',
		            selected: true
		        }],
		        stationList: [],
		        allTrade: [],
		        areaVisible: false,
		        riskInfo: {}, // 风险点详细信息
		        currentRisk: {}, // 当前点击风险点
		        infoWin: null, // 重大风险源信息
		        overCity: null,
		        cityModelLeft: 0,
		        cityModelTop: 0,
		        xm_id: this.$storage.get('xm') ? this.$storage.get('xm').xm_id : 11,
		        markersList: [],
		        showMarkers: false,
		        riskPoints: [],
		        isScreenFull: false,
		        markerList: [],
		        qyfxList: [],
		        labelList: []
			}
		},
		watch: {
			cityName(val) {
				// let params = {
				// 	xm_id: this.xm_id,
				// 	per_page: 1000,
				// 	page: 1,
				// }
				// let quyu = this.areaList.find(areaItem => areaItem.mc == val)
				this.cityList.forEach(item => {
					if(item.name == val) {
						item.polygon.setFillOpacity(1)
						item.polygon.setWeight(5)
					}else {
						item.polygon.setFillOpacity(0.5)
						item.polygon.setWeight(2)
					}
				})
				this.labelList.forEach(item => {
					console.log(item.NP, this.cityName)
            		let opacity = item.NP == this.cityName ? 1 : 0.01
            		item.setOpacity(opacity)
            	})
				this.getFxysl();
			},
			showCityList(val) {
				$('#header_select_dropdown').slideToggle('normal', 'swing');
			},
			'$store.state.industry'(val) {
				this.getAreaIndustryList(() => {
					this.getFxysl(() => {
						this.cityList.forEach(item => {
							let qyfx = this.qyfxList.find(qyfxItem => qyfxItem.qxmc == item.name)
							let fxdj = qyfx ? qyfx.fxdj : ''
							let level = this.levelList.find(levelItem => fxdj == levelItem.name)
							item.color = level ? level.color : '#999'
							item.polygon.setFillColor(item.color)
						})
					})
				})
			},
			'$store.state.levelIds'(val) {
				setTimeout(() => {
					if(val == this.$store.state.levelIds) {
						this.clearOverlays()
						this.drawRiskMap()
						let list = this.$store.state.selectIds.split(',');
						getIntersection(list, ['14', '15', '16']).length > 0 && this.drawSubwayLine();
					}
				}, 300)
			}
		},
		computed: {

		},
		methods: {
			init() {
				let self = this;
				let zoom = 10;

	            this.map = new T.Map('mapDiv');
	            this.map.centerAndZoom(this.mapConfig.center || new T.LngLat(119.886055, 29.996153), this.mapConfig.zoom || 9);
	            // this.map.setStyle('indigo') // 修改地图风格
	            this.map.enableScrollWheelZoom();
	            // this.map.disableDoubleClickZoom() // 禁止双击放大
	            this.map.setMinZoom(4);
            	this.map.setMaxZoom(14);
            	let ctrl = new T.Control.MapType({
            		position: T_ANCHOR_BOTTOM_RIGHT
            	}); 
            	this.map.addControl(ctrl); // 增加地图类型控件
            	//移除图层
            	this.map.removeControl(TMAP_NORMAL_MAP);
	            //添加图层
	            this.map.addControl(TMAP_SATELLITE_MAP);
            	let zoomCtrl = new T.Control.Zoom({
            		position: T_ANCHOR_BOTTOM_RIGHT
            	})
            	this.map.addControl(zoomCtrl);
            	this.map.on('zoomend', (type, target) => {
            		this.labelList.forEach(item => {
	            		item.setFontSize(Math.pow(2, (this.map.getZoom() - 5) > 5 ? 5 : (this.map.getZoom() - 5)))
	            	})
            	})
				this.getAreaIndustryList(() => {
					this.getFxysl(() => {
						this.drawMunicipios();
					})
				})
				setTimeout(() => {
					this.map.checkResize()
				}, 100)
			},
			allMap() {
				this.map.centerAndZoom(this.mapConfig.center || new T.LngLat(119.886055, 29.996153), this.mapConfig.zoom || 9);
			},
			// 区域选择
			selectArea(name, zoom) {
				if(name == 'all') {
					this.cityName = '全部'
	            	this.map.centerAndZoom(this.mapConfig.center || new T.LngLat(119.886055, 29.996153), this.mapConfig.zoom || 9);
				}else {
					let item = this.cityList.find(item => item.dropName == name)
					this.cityName = item.name;
	            	this.map.centerAndZoom(item.latlng, zoom || 11);
				}
			},
			visibleChange(status) {
				this.areaVisible = status;
			},
			// 绘制县区覆盖物
			async drawMunicipios() {
				let self = this;
				let times = Math.ceil(this.zsl / 1000)
				let riskPoints = []
				var bdary = new BMap.Boundary();
				console.log(this.cityList)
				this.cityList.forEach(async item => {
					item.fxyList = []
					let qyfx = this.qyfxList.find(qyfxItem => qyfxItem.qxmc == item.name)
					let fxdj = qyfx ? qyfx.fxdj : ''
					let level = this.levelList.find(levelItem => fxdj == levelItem.name)
					item.color = level ? level.color : '#999'
			        let jsonData = {
						'1': all_county,
						'13': minhou
					}
					console.log(this.xm_id)
			        item.data = jsonData[this.xm_id].features.find(item_ => item_.properties.NAME == item.name)
			        let points = [];
			        console.log(item.data)
					item.data.geometry.coordinates[0].forEach(item_ => {
						points.push(new T.LngLat(item_[0], item_[1]));
					})
					item.polygon = new T.Polygon(points, {
		                color: '#ffffff', weight: 2, opacity: 1, fillColor: item.color, fillOpacity: 0.5
		            });
					this.map.addOverLay(item.polygon);
					item.latlng = new T.LngLat(item.data.properties.centerLon, item.data.properties.centerLat);
		            let label = new T.Label({
		                text: item.name,
		                position: item.latlng,
		                offset: new T.Point(0 - item.name.length * 20, 0)
		            });
		            label.setFontColor('#000')
					this.map.addOverLay(label);
				    label.setOpacity(0.01)
					this.labelList.push(label)
					item.polygon.addEventListener("click", () => {
						if(item.color == '#999'){
							return false
						}
		            	this.cityName = item.name;
		            	this.map.centerAndZoom(item.latlng, 11);
		            });
		            item.polygon.addEventListener("mouseover", e => {
		            	if(item.color == '#999'){
							return false
						}
		            	item.polygon.setFillOpacity(1)
		            	label.setOpacity(1)
		            	// this.overCity = item
		            });
		            item.polygon.addEventListener("mouseout", e => {
		            	if(item.color == '#999'){
							return false
						}
						if(item.name !== this.cityName) {
		            		item.polygon.setFillOpacity(0.5)
		            		label.setOpacity(0.01)
		            	}
		            	// this.overCity = null
		            });
	            })
			},
			async getAreaIndustryList(cb) {
				if(!this.$store.state.industry) {
					cb && cb()
					return
				}
				let params = {
					hymc: this.$store.state.industry.fxylbmc
				}
				let { status_code, data } = await api.getAreaIndustryList(params)
				if(status_code == 200) {
					this.qyfxList = data
					cb && cb()
				}
			},
			async getFxysl(cb) {
				let quyu = this.areaList.find(areaItem => areaItem.mc == this.cityName)
				let params = {
					xm_id: this.xm_id,
					per_page: 10,
					page: 1,
				}
				quyu && (params.quyu_id = quyu.id)
				this.$store.state.industry &&  (params.fxylb = this.$store.state.industry.dm)
				let times
				let { status_code: status_code_, fxdjsl, zsl } = await api.getFxyList(params)
				this.zsl = zsl
				this.levelList.forEach(item => {
					item.value = fxdjsl[item.name]
				})
				this.$store.dispatch('save_levelList', JSON.parse(JSON.stringify(this.levelList)))
				cb && cb()
			},
			async getTradeList() {
				let params = {
					act: 'getall'
				}
				let { status_code, data } = await api.getFxylbList(params)
				if(status_code == 200) {
					this.allTrade = data;
					this.tradeList = this.toTree(data, 1);
					this.$store.dispatch('save_tradeList', this.tradeList);
					this.$nextTick(() => {
        				this.$refs.trade_list.setHeight()
					})
				}
			},
			toTree(data, index) {
			    // 删除 所有 children,以防止多次调用
			    data.forEach(function(item) {
			    	item.selected = false
			    	item.showChildren = false
			        delete item.children
			    })
			    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
			    var map = {}
			    data.forEach(function(item) {
			        map[item.id] = item
			    })
			    var val = []
			    data.forEach(function(item) {
			        // 以当前遍历项，的pid,去map对象中找到索引的id
			        var parent = map[item.parent_id]
			        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			        if (parent) {
			            ;(parent.children || (parent.children = [])).push(item)
			        } else {
			            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			            val.push(item)
			        }
			    })
			    return val
			},
			drag(e) {
				let elem = e.target
				let distance = e.clientY - e.target.offsetTop
				document.onmousemove = e => {
					console.log(e.clientY, distance)
					this.$refs.areaBox.style.height = this.$refs.left_box.offsetHeight - (e.clientY - distance) + 'px'
					console.log(this.$refs.areaBox.style.height)
				}
				document.onmouseup = e => {
					document.onmousemove = null
					document.onmouseup = null
					this.$nextTick(() => {
						this.$refs.trade_list.setHeight()
					})
				}
			},
			dragLeft(e) {
				let elem = e.target
				let distance = e.clientX - e.target.offsetLeft
				document.onmousemove = e => {
					this.$refs.left.style.width = (e.clientX - distance) + 'px'
				}
				document.onmouseup = e => {
					document.onmousemove = null
					document.onmouseup = null
					// this.$nextTick(() => {
					// 	this.$refs.trade_list.setHeight()
					// })
				}
			},
		},
		async created() {
			let cityList = []
			if(this.xm_id == 13) {
				let colorList = ['#1C86F3', '#F25E5E', '#F49852', '#EFE850', ]
				cityList = minhou.features.filter(item => item.properties.NAME !== '闽侯县').map((item_, index) => {
					return {
						name: item_.properties.NAME,
						dropName: item_.properties.NAME,
						polygon: null,
						color: colorList[index % colorList.length],
						index: 0,
						point: {x: -20, y: -10},
						zoom: 12
					}
				})
				console.log(this.cityList)
			}else if(this.xm_id == 1) {
				cityList = [
					{"name": "上城区", dropName: "sc", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
					{"name": "下城区", dropName: "xc", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
					{"name": "西湖区", dropName: "xh", "polygon": null, color: '#1C86F3', index: 1, point: {x: -20, y: -10}, zoom: 11},
					{"name": "江干区", dropName: "jg", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
					{"name": "拱墅区", dropName: "gs", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
					{"name": "滨江区", dropName: "bj", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
					{"name": "萧山区", dropName: "xs", "polygon": null, color: '#F25E5E', index: 0, point: {x: -20, y: -10}},
					{"name": "余杭区", dropName: "yh", "polygon": null, color: '#F49852', index: 0, point: {x: -20, y: -10}},
					{"name": "临安区", dropName: "la", "polygon": null, color: '#EFE850', index: 0, point: {x: -20, y: -10}},
					{"name": "富阳区", dropName: "fy", "polygon": null, color: '#F49852', index: 0, point: {x: -20, y: -10}},
					{"name": "建德市", dropName: "jd", "polygon": null, color: '#F25E5E', index: 0, point: {x: -20, y: -10}},
					{"name": "桐庐县", dropName: "tl", "polygon": null, color: '#EFE850', index: 0, point: {x: -20, y: -10}},
					{"name": "淳安县", dropName: "ca", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
					{"name": "钱塘新区", dropName: "qt", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 11}
				]

			}
			this.getTradeList()
			let parent_ids = {
				'1': 28,
				'13': 26
			}
			let { status_code, data } = await api.getAreaList({parent_id: parent_ids[this.xm_id], per_page: 1000})
			if(status_code == 200) {
				this.areaList = data.data
				cityList.forEach(item => {
					let item_ = this.areaList.find(areaItem => areaItem.mc == item.name)
					item_ && (item.id = item_.id)
				})
				this.cityList = cityList
			}
		},
		mounted() {
			this.init();
        	document.addEventListener('fullscreenchange', e => {
        		this.isScreenFull = !this.isScreenFull
        	})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		.trade1 {
			margin-left: 0;
			margin-right: 40px;
		}
		.mapDiv {
			// position: fixed;
			// left: 0;
			// right: 0;
			// top: 40px;
			// bottom: 0;
			// z-index: 100;
			width: 100%;
			height: 100%;
		}
		.level_box {
			position: absolute;
			top: 0;
			left: 32px;
			z-index: 1000;
			.level_item {
				margin-bottom: 12px;
				padding: 0 14px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				background: url('../../assets/frame.png');
				background-size: 100% 100%;
				.check {
					margin-right: 16px;
					width: 20px;
					height: 20px;
					background: url('../../assets/agreement_off.png');
					background-size: 100%;
					cursor: pointer;
				}
				.selected {
					background: url('../../assets/agreement_on.png');
					background-size: 100%;
				}
				.level_item_name {
					margin-right: 8px;
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					text-align: center;
				}
				.level_item_color {
					
				}
			}
		}
		.left {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			z-index: 1000;
			// padding-top: 48px;
			box-sizing: border-box;
			width: 240px;
			background: rgba(5,27,74,0.87);
			overflow: hidden;
			.drag_line {
				position: absolute;
				top: 0;
				right: 0;
				width: 3px;
				height: 100%;
				background: transparent;
				cursor: ew-resize;
			}
			.left_box {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				.left_item {
					width: 100%;
					height: 100%;
					overflow: hidden;
					border: 1px solid #10388C;
					box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
					&:first-child {
						flex: 1;
					}
					&:last-child {
						height: 30%;
						.line {
							width: 100%;
							height: 1px;
							background: #25b5d8;
							cursor: s-resize;
						}
					}
					.trade_list {
						height: 100%;
						box-sizing: border-box;
						padding-bottom: 24px;
					}
					.header_select_dropdown_list {
						padding-right: 20px;
						box-sizing: border-box;
						width: calc(100% + 20px);
						height: calc(100% - 58px);
						overflow-y: scroll;
						// min-height: 100%;
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						.header_select_dropdown_item {
							margin-top: 28px;
							width: 40%;
							box-sizing: border-box;
							display: flex;
							align-items: center;
							justify-content: center;
							.check {
								margin-right: 16px;
								width: 20px;
								height: 20px;
								background: url('../../assets/agreement_off.png');
								background-size: 100%;
								cursor: pointer;
							}
							.selected {
								background: url('../../assets/agreement_on.png');
								background-size: 100%;
							}
							span {
								width: 60px;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								text-align: left;
								color: #fff;
								line-height: 20px;
								cursor: pointer;
								display: inline-block;
							}
							.active {
								color: rgb(16, 246, 255);
							}
						}
					}
				}
			}
			.close {
				position: absolute;
				left: 16px;
				top: 24px;
				width: 16px;
				height: 16px;
				background: url('../../assets/close.png');
				background-size: 100%;
			}
		}
		.select_trade {
			position: fixed;
			top: 280px;
			right: 24px;
			z-index: 100;
			background: url('../../assets/right-case.png');
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			img {
				
			}
			.select_trade_text {
				margin: 12px 0 4px;
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #FFFFFF;
				text-align: center;
				line-height: 20px;
			}
		}
		.trade_box {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 1000;
			box-sizing: border-box;
			width: 400px;
			background: rgba(5,27,74,0.87);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			overflow: hidden;
			.right_box {
				width: 420px;
				height: 100%;
				.trade_order_popup {
					width: 100%;
					height: calc(100% - 342px);
					overflow-x: hidden;
					.trade_order_content {
						width: calc(100% + 20px);
						height: 100%;
						overflow-y: scroll;
					}
				}
			}
			.close {
				position: absolute;
				right: 16px;
				top: 24px;
				width: 16px;
				height: 16px;
				background: url('../../assets/close.png');
				background-size: 100%;
			}
		}
		.bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1002;
			background: rgba(5,27,74,0.95);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			box-sizing: border-box;
			height: 276px;
		}
		.bottom_left {
			left: 400px;
		}
		.bottom_right {
			right: 400px;
		}
		/deep/.tdt-label {
			background: transparent;
			box-shadow: none;
			border: none;
			color: rgba(255, 255, 255, 0.87);
		}
		.city_model {
			position: fixed;
			z-index: 1003;
			background: rgba(5, 27, 74, .87);
			border-radius: 8px;
			border: 1px solid #10388c;
			box-shadow: inset 0 0 4px 0 rgba(0, 163, 255, .3);
			padding: 16px;
			width: 160px;
			.city_name {
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #FFFFFF;
				text-align: left;
				line-height: 22px;
			}
			.city_level {
				display: flex;
				align-items: center;
				.city_level_color {
					margin-right: 8px;
					border-radius: 8px;
				}
				.city_level_name {
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #FFFFFF;
					text-align: left;
					line-height: 26px;
				}
			}
		}
		.info {
			position: absolute;
			top: 40px;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1001;
			display: flex;
			justify-content: center;
			align-items: center;
			.info_model_box {
				position: relative;
				width: 560px;
				height: 410px;
				background: url('../../assets/point-up.png') center no-repeat;
				background-size: contain;
				.close {
					position: absolute;
					right: 16px;
					top: 24px;
					width: 16px;
					height: 16px;
					background: url('../../assets/close.png');
					background-size: 100%;
				}
				.info_model {
					padding: 24px;
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					.info_name {
						font-family: PingFangSC-Medium;
						font-size: 18px;
						color: #FFFFFF;
						text-align: center;
						line-height: 26px;
					}
					.info_content {
						margin-top: 8px;
						/deep/.ivu-tabs {
							.ivu-tabs-bar {
								border-bottom: none;
								.ivu-tabs-nav {
									.ivu-tabs-tab {
										color: rgba(255,255,255,0.70);
										&:hover {
											color: #10F6FF;
										}
									}
									.ivu-tabs-tab-active {
										color: #10F6FF;
									}
									.ivu-tabs-ink-bar {
										background-color: #10F6FF;
									}
								}
							}
						}
						.baseInfo_box {
							width: 100%;
							height: 280px;
							overflow: hidden;
							.baseInfo {
								width: 100%;
								height: 280px;
								p {
									margin-bottom: 8px;
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: #FFFFFF;
									text-align: left;
									.red {
										font-family: PingFangSC-Medium;
										font-size: 24px;
										color: #F25E5E;
										text-align: left;
									}
								}
								.radar {
									width: 100%;
									height: 200px;
								}
							}
						}
					}
				}
				/deep/ .marker_model {
					overflow-y: hidden;
					.marker_content {
						width: calc(100% + 50px);
						height: 100%;
						overflow-y: scroll;
						.ivu-tree-title-selected {
							background-color: #4e7eb1;
						}
						.ivu-tree-title {
							color: #fff;
							&:hover {
								background-color: #4e7eb1;
							}
						}
						.ivu-icon {
							&:before {
								color: #fff;
							}
						}
					}
				}
			}
		}
	}

	.ivu-dropdown-menu {
		background: rgba(5, 27, 74, 0.87);
		border: 1px solid #10388C;
	    box-shadow: inset 0 0 0.16667rem 0 rgba(0, 163, 255, 0.3);
	}
	.ivu-dropdown-item {
		color: #ffffff;
		&:hover {
			color: #2b85e4;
			background: transparent;
		}
	}
	/deep/.tdt-right {
		right: 400px;
	}
	/deep/.tdt-bottom {
		bottom: 0!important;
	}
</style>