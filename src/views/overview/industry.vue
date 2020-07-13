<template>
	<div class="container" id="overview" style="min-width: 1200px; height: 100%">
		<div class="header">
				<div class="header_left">
					<!-- <Dropdown :transfer="true" trigger="click" placement="bottom-start" @on-click="selectArea" @on-visible-change="visibleChange" transfer-class-name="overview_dropdown">
						
						<DropdownMenu slot="list">
							<DropdownItem name="all">全部</DropdownItem>
	            			<DropdownItem v-for="item in cityList" :key="item.dropName" :name="item.dropName">{{item.name}}</DropdownItem>
	            		</DropdownMenu>
					</Dropdown> -->
					<div class="header_select">
						<div @click="showCityList = !showCityList" style="display: flex; align-items: center;">
							<span :style="{color: showCityList ? '#10F6FF' : '#fff'}">{{cityName}}</span>
							<div class="header_select_arrow" id="header_select_arrow" :class="{header_select_arrow_rotate1: !showCityList, header_select_arrow_rotate2: showCityList}">
								<Icon type="md-arrow-dropup" :color="showCityList ? '#10F6FF' : '#fff'" />
							</div>
						</div>
						<div v-show="false" class="header_select_dropdown" id="header_select_dropdown">
							<div class="header_select_dropdown_list">
								<div class="header_select_dropdown_item" @click="selectArea('all')">杭州市</div>
	            				<div class="header_select_dropdown_item" v-for="item in cityList" :key="item.dropName" @click="selectArea(item.dropName)">{{item.name}}</div>
							</div>
						</div>
					</div>
					<div class="header_select" style="flex: 1; margin-left: 35px">
						<div style="display: flex; " @click="handleSelectLeft">
							<span :style="{color: showLeft ? '#10F6FF' : '#fff'}">风险统计</span>
							<div class="header_select_arrow" id="header_select_arrow" :class="{header_select_arrow_rotate1: !showLeft, header_select_arrow_rotate2: showLeft}">
								<Icon type="md-arrow-dropup" :color="showLeft ? '#10F6FF' : '#fff'" />
							</div>
						</div>
					</div>
				</div>
				<div class="header_title">杭州市风险地图</div>
				<div class="header_select trade1" @click="handleSelectRight(true)">
					<span :style="{color: showRight ? '#10F6FF' : '#fff'}">图层</span>
					<div class="header_select_arrow" id="header_select_arrow" :class="{header_select_arrow_rotate1: !showRight, header_select_arrow_rotate2: showRight}">
						<Icon type="md-arrow-dropup" :color="showRight ? '#10F6FF' : '#fff'" />
					</div>
				</div>
		</div>
		<div class="mapDiv" id="mapDiv"></div>
		<div class="level_box" ref="level_box">
			<div class="level_item" v-for="item in levelList" :key="item.color" style="width: 200px; height: 36px;">
				<div class="check" :class="{selected: item.selected}"  @click="selectLavel(item)"></div>
				<div class="level_item_name">{{item.name}}（{{item.value}}）</div>
				<div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
			</div>
		</div>
		<div class="tool_box">
			<div class="screenfull" v-show="!isScreenFull" @click="screenfull">全屏</div>
		</div>
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
		<div class="left" id="left" v-show="false">
			<!-- <risk-detail :data="riskInfo" :currentRisk="currentRisk"  @drawRiskSource="handleDrawRiskSource"></risk-detail> -->
			<div class="left_box">
				<left-box :area="cityName"></left-box>
			</div>
			<!-- <div class="close" @click="handleSelectLeft(false)"></div> -->
		</div>
		<!-- <div class="select_trade" v-show="!showRight" @click="handleSelectRight(true)" style="padding: 12px 0 4px; width: 88px;">
			<img src="@/assets/ic_consult_call.png" style="width
			40px; height: 40px">
			<div class="select_trade_text" style="margin: 12px 0 4px; font-size: 14px; line-height: 20px;">行业分类</div>
			<Icon type="ios-arrow-down" size="12px" color="#ffffff"/>
		</div> -->
		<div class="trade_box" id="right" v-show="false">
			<div class="right_box">
				<trade-box :data="tradeList"></trade-box>
			</div>
			<!-- <div class="close" @click="handleSelectRight(false)"></div> -->
		</div>
		<div class="bottom" :class="{bottom_left: showLeft, bottom_right: showRight}" v-if="!reset && showInfoModel">
			<risk-time></risk-time>
		</div>
		<div class="city_model" id="city_model" v-if="overCity" :style="{left: `${cityModelLeft}px`, top: `${cityModelTop}px`}">
			<div class="city_name">{{overCity.name}}</div>
			<!-- fxyList -->
			<div class="city_level" v-for="(item, index) in levelList" :key="item.color">
				<div class="city_level_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
				<div class="city_level_name">{{item.name}}：{{overCity.fxyList[index]}}</div>
			</div>
		</div>

		<div class="info" v-show="showMarkers && !showInfoModel">
			<div class="info_model_box">
				<div class="close" @click="showMarkers = false"></div>
				<div class="info_model marker_model">
					<div class="marker_content">
						<Tree :data="markersList" @on-select-change="selectMarker"></Tree>
					</div>
				</div>
			</div>
		</div>
		<div class="info" v-if="showInfoModel">
			<div class="info_model_box">
				<div class="close" @click="showInfoModel = false"></div>
				<div class="info_model">
					<div class="info_name">{{fxyInfo.fxymc}}</div>
					<div class="info_content">
						<Tabs value="name1">
					        <TabPane label="基本信息" name="name1">
								<div class="baseInfo_box">
									<div class="baseInfo">
										<p>所属区域：{{fxyInfo.quyu}}</p>
										<p>地址：{{fxyInfo.dz}}</p>
									</div>
								</div>
					        </TabPane>
					        <TabPane label="风险信息" name="name2">
								<div class="baseInfo_box">
									<div class="baseInfo">
										<div style="display: flex; flex-wrap: wrap;">
											<p style="margin-right: 32px;">风险等级：<span class="red">{{fxyInfo.fxdj}}</span></p>
											<p style="margin-right: 32px;">风险值：<span class="red">{{Number(fxyInfo.fxz)}}</span></p>
											<p>风险源类型：<span class="red">{{fxyInfo.fxylbmc}}</span></p>
										</div>
										<div class="radar" id="radar">
											
										</div>
									</div>
								</div>
					        </TabPane>
					        <TabPane label="隐患治理" name="name3">
								<div class="baseInfo_box">
									<div class="baseInfo">
										<div style="display: flex; flex-wrap: wrap;">
											<p style="margin-right: 32px;">隐患数量：<span class="red">378个</span></p>
											<p style="margin-right: 32px;">重大隐患数量：<span class="red">102个</span></p>
											<p style="margin-right: 32px;">隐患整改率：<span class="red">78%</span></p>
											<p style="margin-right: 32px;">隐患更新频率：<span class="red">7天</span></p>
										</div>
									</div>
								</div>
					        </TabPane>
					    </Tabs>
					</div>
				</div>
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
	import LeftBox from '@/components/left/index'
	import TradeBox from '@/components/right/index'
	import RiskTime from '@/components/bottom/index'
	import RiskDetail from '@/components/left/riskDetail'
	import api from '@/api/api'
	import quyu from '@/common/js/quyu_overview'
	import storage from 'good-storage'
	import screenfull from 'screenfull'
	export default {
		name: 'industry',
		components: {
			TradeBox,
			LeftBox,
			RiskTime,
			RiskDetail
		},
		mixins: [quyu],
		data() {
			return {
				showCityList: false,
				showInfoModel: false,
				fxyInfo: {},
				cityName: '杭州市',
				username: storage.get('username'),
				area: '全部',
				showLeft: false,
				showRight: false,
				tradeList,
				reset: false,
				map: null, // 地图
				polygon: null, // 面对象
				cityList: [
					{"name": "上城区", dropName: "sc", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
					{"name": "下城区", dropName: "xc", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
					{"name": "西湖区", dropName: "xh", "polygon": null, color: '#1C86F3', index: 1, point: {x: -20, y: -10}},
					{"name": "江干区", dropName: "jg", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
					{"name": "拱墅区", dropName: "gs", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
					{"name": "滨江区", dropName: "bj", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
					{"name": "萧山区", dropName: "xs", "polygon": null, color: '#F25E5E', index: 0, point: {x: -20, y: -10}},
					{"name": "余杭区", dropName: "yh", "polygon": null, color: '#F49852', index: 0, point: {x: -20, y: -10}},
					{"name": "临安区", dropName: "la", "polygon": null, color: '#EFE850', index: 0, point: {x: -20, y: -10}},
					{"name": "富阳区", dropName: "fy", "polygon": null, color: '#F49852', index: 0, point: {x: -20, y: -10}},
					{"name": "建德市", dropName: "jd", "polygon": null, color: '#F25E5E', index: 0, point: {x: -20, y: -10}},
					{"name": "桐庐县", dropName: "tl", "polygon": null, color: '#EFE850', index: 0, point: {x: -20, y: -10}},
					{"name": "淳安县", dropName: "ca", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}}
				],
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
		        xm_id: process.env.NODE_ENV === 'development' ? 11 : 1,
		        markersList: [],
		        showMarkers: false,
		        riskPoints: [],
		        isScreenFull: false
			}
		},
		watch: {
			cityName(val) {
				let params = {
					xm_id: this.xm_id,
					per_page: 1000,
					page: 1,
				}
				let quyu = this.areaList.find(areaItem => areaItem.mc == val)
				// quyu && (params.quyu_id = quyu.id)
				// let { status_code, data } = await api.getFxyList(params)
				// if(status_code == 200) {
				// 	let riskPoints = data.data
				// 	this.$store.dispatch('save_riskPoints', riskPoints)
				// }
				if(quyu) {
					riskPoints = this.riskPoints.filter(item => item.id == quyu.id)
				}else {
					riskPoints = this.riskPoints
				}
			},
			showCityList(val) {
				$('#header_select_dropdown').slideToggle('normal', 'swing');
			},
			showLeft(val) {
				if(val) this.$refs.level_box.style.left = '420px';
				$('#left').slideToggle('normal', 'swing', () => {
					if(!val) this.$refs.level_box.style.left = '32px';
				});
			},
			showRight(val) {
				if(val) {
					$('#right').slideDown();
				}else {
					$('#right').slideUp();
				}
			},
			'$store.state.selectIds'(val) {
				setTimeout(() => {
					if(val == this.$store.state.selectIds) {
						this.drawMunicipios();
						this.drawRiskMap()
					}
				}, 300)
			},
			'$store.state.levelIds'(val) {
				setTimeout(() => {
					if(val == this.$store.state.levelIds) {
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
				let zoom = 8;


				// let imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=701640b81eacb6c191dd460f74393688";
	   //          //创建自定义图层对象
	   //          let lay = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
	   //          let config = {layers: [lay]};
	   //          //初始化地图对象
	   //          this.map = new T.Map("mapDiv", config);
	   //          //设置显示地图的中心点和级别
	   //          this.map.centerAndZoom(new T.LngLat(120.15, 30.28), zoom);
	   //          //允许鼠标滚轮缩放地图
    //         	this.map.enableScrollWheelZoom();
    //         	this.map.disableDoubleClickZoom() // 禁止双击放大

	            this.map = new T.Map('mapDiv');
	            this.map.centerAndZoom(new T.LngLat(120.15, 30.28), zoom); // 
	            // this.map.setStyle('indigo') // 修改地图风格
	            this.map.enableScrollWheelZoom();
	            // this.map.disableDoubleClickZoom() // 禁止双击放大
	            this.map.setMinZoom(4);
            	this.map.setMaxZoom(14);
            	let ctrl = new T.Control.MapType({
            		position: T_ANCHOR_BOTTOM_RIGHT
            	}); 
            	this.map.addControl(ctrl); // 增加地图类型控件
            	let zoomCtrl = new T.Control.Zoom({
            		position: T_ANCHOR_BOTTOM_RIGHT
            	})
            	this.map.addControl(zoomCtrl);
	            this.drawMunicipios();
			},
			// 区域选择
			selectArea(name) {
				this.showCityList = false
				if(name == 'all') {
					this.cityName = '杭州市'
					this.drawRiskMap();
	            	this.drawMunicipios();
	            	this.map.centerAndZoom(new T.LngLat(120.15, 30.28), 8);
				}else {
					let item = this.cityList.find(item => item.dropName == name)
					this.cityName = item.name;
					this.drawRiskMap();
	            	this.drawMunicipios();
	            	this.map.centerAndZoom(item.latlng, 10);
				}
			},
			visibleChange(status) {
				this.areaVisible = status;
			},
			// 绘制县区覆盖物
			async drawMunicipios() {
				let self = this;
				let qyfxList
				let { status_code, data } = await api.getQyfxList({})
				if(status_code == 200) {
					qyfxList = data
				}
				// let quyu = this.areaList.find(areaItem => areaItem.mc == item.name)
				let params = {
					xm_id: this.xm_id,
					per_page: 10,
					page: 1,
				}
				// quyu && (params.quyu_id = quyu.id)
				let riskPoints = []
				let times
				let { status_code: status_code_, data: data_ } = await api.getFxyList(params)
				if(status_code_ == 200) {
					times = Math.ceil(data_.total / 1000)
					for(let i = 0; i < times; i++) {
						setTimeout(async () => {
							let params = {
								xm_id: this.xm_id,
								per_page: 1000,
								page: i + 1,
							}
							let { status_code, data } = await api.getFxyList(params)
							if(status_code == 200) {
								riskPoints = [...riskPoints, ...data.data]
								if(riskPoints.length == data_.total) {
									this.$store.dispatch('save_riskPoints', riskPoints)
									this.riskPoints = riskPoints
									this.drawRiskMap()
									this.cityList.forEach(item => {
										item.fxyList = []
										// this.levelList.forEach(levelItem => {
										// 	setTimeout(() => {
										// 		item.fxyList.push(riskPoints.filter(riskItem => riskItem.fxdj == levelItem.name).length)
										// 	})
										// })
										let qyfx = qyfxList.find(qyfxItem => qyfxItem.qxmc == item.name)
										let fxdj = qyfx ? qyfx.fxdj : ''
										let level = this.levelList.find(levelItem => fxdj == levelItem.name)
										item.color = level ? level.color : item.color
										var bdary = new BMap.Boundary();
									    bdary.get("杭州市" + item.name, async res => { //获取行政区域
									    	item.fxyList = []
									    	let quyu = this.areaList.find(areaItem => areaItem.mc == item.name)
									    	this.levelList.forEach(levelItem => {
									    		quyu && (riskPoints = riskPoints.filter(riskItem => riskItem.quyu_id == quyu.id))
												item.fxyList.push(riskPoints.filter(riskItem => riskItem.fxdj == levelItem.name).length)
											})
							            	let searchWord = item.name;
											axios.get(`http://api.tianditu.gov.cn/administrative?postStr={"searchWord":"${searchWord}","searchType":"1","needSubInfo":"false","needAll":"false","needPolygon":"true","needPre":"true"}&tk=701640b81eacb6c191dd460f74393688`).then(result => {
										        // map.clearOverlays();        //清除地图覆盖物       
										        var count = res.boundaries.length; //行政区域的点有多少个
										        if (count === 0) {
										            // alert('未能获取当前输入行政区域');
										            return;
										        }	
										        let arr = res.boundaries[0].split(';')
												let points = [];
												let point = ''
												arr.forEach(item => {
													point = item.split(', ');
													points.push(new T.LngLat(point[0], point[1]));
												})
												item.polygon = new T.Polygon(points, {
									                color: '#008192', weight: 2, opacity: 1, fillColor: item.color, fillOpacity: 0.5
									            });
												this.map.addOverLay(item.polygon);
												let bound = result.data[item.name == '西湖区' ? 1 : 0].bound.split(',').map(item => {
													return item - 0;
												})
												// var latlng = new T.LngLat(result.data[0].lnt, result.data[0].lat);
												item.latlng = new T.LngLat((bound[0] + bound[2]) / 2, (bound[1] + bound[3]) / 2);
									   //          var label = new T.Label({
									   //              text: item.name,
									   //              position: item.latlng,
									   //              offset: new T.Point(-20, 0)
									   //          });
												// this.map.addOverLay(label);
									            item.polygon.addEventListener("click", () => {
									            	self.cityName = item.name;
									            	self.drawRiskMap();
									            	self.drawMunicipios();
									            	self.map.centerAndZoom(item.latlng, 10);
									            });
									            item.polygon.addEventListener("mouseover", e => {
									            	item.polygon.setFillOpacity(1)
									            	this.overCity = item
									            });
									            item.polygon.addEventListener("mouseout", e => {
									            	item.polygon.setFillOpacity(0.5)
									            	this.overCity = null
									            });
									            window.addEventListener("mousemove", e => {
								            		if(this.overCity) {
								            			this.cityModelTop = e.y - 60
								            			this.cityModelLeft = e.x - 180
								            		}
								            	})
											})
									    });
						            })
								}
							}
						}, 1)
					}
				}
			},
			selectLavel(item) {
				item.selected = !item.selected
				this.drawMunicipios();
				this.drawRiskMap()
			},
			async drawRiskMap() {
				this.map.clearOverLays();
				let levelList = this.levelList.filter(item => item.selected).map(item => item.name);
				let selectIdList = this.$store.state.selectIds.split(',')
				let fxylb = this.allTrade.filter(item => selectIdList.includes(item.id + '')).map(item => item.dm).join(',')
				let quyu = this.areaList.find(item => item.mc == this.cityName)
				// let params = {
				// 	xm_id: this.xm_id,
				// 	fxylb,
				// 	per_page: 1000,
				// 	page: 1,
				// }
				// quyu && (params.quyu_id = quyu.id)
				let riskPoints = []
				if(quyu) {
					riskPoints = this.riskPoints.filter(item => item.id == quyu.id)
				}else {
					riskPoints = this.riskPoints
				}
				this.$store.dispatch('save_fxySum', riskPoints.length)
				if(levelList.length > 0) {
					this.drawRiskPoints(riskPoints.filter(item => levelList.includes(item.fxdj)))
				}else {
					this.drawRiskPoints(riskPoints)
				}
				this.levelList.forEach(item => {
					item.value = riskPoints.filter(riskItem => riskItem.fxdj == item.name).length
				})
				this.$store.dispatch('save_levelList', JSON.parse(JSON.stringify(this.levelList)))
				// let { status_code, data } = await api.getFxyList(params)
				// if(status_code == 200) {
				// 	let riskPoints = data.data
				// 	this.$store.dispatch('save_fxySum', data.data.length)
				// 	if(levelList.length > 0) {
				// 		this.drawRiskPoints(riskPoints.filter(item => levelList.includes(item.fxdj)))
				// 	}else {
				// 		this.drawRiskPoints(riskPoints)
				// 	}
				// 	this.levelList.forEach(item => {
				// 		item.value = riskPoints.filter(riskItem => riskItem.fxdj == item.name).length
				// 	})
				// 	this.$store.dispatch('save_levelList', JSON.parse(JSON.stringify(this.levelList)))
				// }
				// this.riskPoints.forEach(item => {
				// 	item.hasRadar = false;
				// 	item.pdefinedOverlay = null;
	   //          	levelList.includes(item.level + '') && riskPoints.push(item);
	   //          });
	   //          riskPoints.forEach(item => {
	   //          	this.drawAnnotations(item)
	   //          })
			},

			drawRiskPoints(list) {
				let self = this
				let markerArr = []
				list.forEach(item => {
					window.handleClick = () => {
						let userInfo = this.$storage.get('userInfo')
						userInfo.gkdx_id = item.gkdx_id
						userInfo.fxylb = item.fxylb
						this.$storage.set('userInfo', userInfo)
						// this.type = 2
						// this.$router.push('editInfo')
						location.href = process.env.NODE_ENV === "development" ? `${location.origin}/#/editInfo?type=2` : `${location.origin}/v2/#/editInfo?type=2`
					}
					let iconItem =  this.levelList.find(item_ => item_.name == item.fxdj)
					if(!iconItem) {
						return
					}
		            // 创建图片对象
		            let icon = new T.Icon({
		                iconUrl: require(`../../assets/point_${iconItem.color_}.png`),
		                iconSize: new T.Point(26, 27),
		                iconAnchor: new T.Point(12, 27)
		            });
		            //向地图上添加自定义标注
		            let param1 = new T.LngLat(item.jd, item.wd)
		            let marker = new T.Marker(param1, {icon: icon});
		            marker.item = item
		            marker.addEventListener("click", () => {
		       //      	var infoWin1 = new T.InfoWindow();
			      //       var sContent =
			      //           `<div style='margin:0px;'>
			      //           	<div style='margin: 10px; width: 235px'>
									// <div style="color: #0078A8; font-weight: bold; font-size: 18px; line-height: 28px; text-align: center">${item.fxymc}</div>
									// <div style="margin-top: 10px; color: #333;">
									// 	<div>地址：${item.dz}</div>
									// 	<div>详情：<span class="link" onClick=\"handleClick()\">查看</span></div>
									// </div>
			      //           	</div>
			      //           </div>`;
			      //       infoWin1.setContent(sContent);
			      //       marker.openInfoWindow(infoWin1);
		            	// this.drawRadarBox(item);
		            	this.showInfo(item)
		            });
		            // this.map.addOverLay(marker);
		            markerArr.push(marker)
				})
				let markers = new T.MarkerClusterer(this.map, {markers: markerArr});
				for(let i = 0; i < Object.keys(markers).length; i++) {
					if(markers[Object.keys(markers)[i]].clusterclick) {
						markers[Object.keys(markers)[i]].clusterclick.shift()
					}
				}
				markers.addEventListener('clusterclick', e => {
					let markersList = []
					if(!e.target.selfData) {
						console.log(e.target.options)
						e.target.options.markers.forEach(item => {
							let cupx = e.layerPoint
							let px = this.map.lngLatToLayerPoint(item.or)
							if(this.getDistance(cupx, px) < 61) {
								let fxylb = markersList.find(marker => item.item.fxylb == marker.fxylb)
								if(!fxylb) {
									markersList.push({
										title: item.item.fxylbmc,
										expand: false,
										children: [
											{
												title: item.item.fxymc,
												...item.item
											}
										]
									})
								}else {
									fxylb.children.push({
										title: item.item.fxymc,
										...item.item
									})
								}
								this.markersList = markersList
								this.$nextTick(() => {
									this.showMarkers = true;
								})
							}
						})
					}
				})
			},
			selectMarker(data) {
				if(!data[0].children) {
					// this.showMarkers = false;
					this.showInfo(data[0]);
				}
			},
			// 判断两点间直线像素距离
			getDistance(point1, point2) {
				let x = point1.x - point2.x
				let y = point1.y - point2.y
				let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

				console.log(distance)
				return distance
			},
			// 绘制风险点
			drawAnnotations(item, text) {
				let self = this;
	            // 创建图片对象
	            let icon = new T.Icon({
	                // iconUrl: require(`../../assets/risk-point/${item.type_}-${item.level + 1}.png`),
	                iconUrl: require(`../../assets/risk-point/${text}-1.png`),
	                iconSize: new T.Point(18, 25),
	                iconAnchor: new T.Point(10, 25)
	            });
	            //向地图上添加自定义标注
	            let param1 = this.area == '全部' ? new T.LngLat(item.enterprise.lng, item.enterprise.lat) : new T.LngLat(item.lng, item.lat)
	            let marker = new T.Marker(param1, {icon: icon});
	            marker.addEventListener("click", () => {
	            	self.drawRadarBox(item);
	            });
	            this.map.addOverLay(marker);
			},
			showInfo(item) {
				this.fxyInfo = item
				this.getQy(() => {
					let myChart = echarts.init(document.getElementById('radar'));
					myChart.setOption({
					    radar: {
					        indicator: [
					            {name: '危险物质', max: 200},
					            {name: '人员', max: 200},
					            {name: '周边环境', max: 200},
					            {name: '设备', max: 200},
					        ],
					        shape: 'circle',
					    	radius: 60,
					        splitNumber: 3,
					        name: {
					            textStyle: {
					                color: '#fff',
					                fontSize: 12
					            }
					        },
					        splitLine: {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        splitArea: {
					            show: false
					        },
					        axisLine: {
					            lineStyle: {
					                color: '#fff'
					            }
					        }
					    },
			            tooltip: {
			                trigger: 'axis'
			            },
					    series: [
					        {
					            name: '风险点信息',
					            type: 'radar',
					            lineStyle: {
								    normal: {
								        width: 1,
								        opacity: 0.5
								    }
								},
					            data: [{
					            	value: [100, 120, 110, 160]
					            }],
					            symbol: 'none',
					            itemStyle: {
					                color: 'rgb(16,246,255)'
					            },
					            lineStyle: {
					            	color: '#10F6FF'
					            },
					            areaStyle: {
					                opacity: 0.8
					            }
					        }
					    ]
					});
				})
			},
			// 风险资源展示
			handleDrawRiskSource(item) {
				if(this.infoWin) {
					this.infoWin.closeInfoWindow();
					this.infoWin = null;
				}
				let lnglat = new T.LngLat(item.lng, item.lat);
				this.infoWin = new T.InfoWindow();
				this.infoWin.setLngLat(lnglat);
				this.infoWin.setContent(`名称：${item.dsname}<br/>地址：${item.dsaddress}<br/>风险物品：${item.dsscale}<br/>所属园区：${item.dsparkname}`);
				this.infoWin.setOffset([0, -20]);
				this.map.addOverLay(this.infoWin);
			},
			// 绘制雷达图
			drawRadarBox(item) {
	            this.currentRisk = item;
				let params = {
					user_enterprise_id: this.area == '全部' ? item.enterprise.user_enterprise_id : item.user_enterprise_id
				}
				api.getWhqy(params).then(res => {
					this.riskInfo = JSON.stringify(res.data) == '[]' ? {} : res.data;
					if(!this.showLeft) {
						this.showLeft = true;
					}
				})
			},
			// 清除地图覆盖物
			clearAll() {
				this.map.clearOverLays();
				this.riskPoints.forEach(item => {
	            	this.drawAnnotations(item)
	            })
			},
			// 
			handleSelectLeft() {
				this.reset = true
				this.showLeft = !this.showLeft
				this.$nextTick(() => {
					this.reset = false
				})
			},
			handleSelectRight(bool) {
				this.reset = true
				this.showRight = !this.showRight
				this.$nextTick(() => {
					this.reset = false
				})
			}, 
			// 获取行业类目
			async getTradeList() {
				let params = {
					act: 'getall'
				}
				let { status_code, data } = await api.getFxylbList(params)
				if(status_code == 200) {
					this.allTrade = data;
					console.log(data.map(item => item.fxylbmc).splice(3, 100))
					let list = this.toTree(data, 1);
					this.$store.dispatch('save_tradeList', list);
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
			screenfull() {
				let de = document.querySelector('#overview') || document.documentElement;
				const requestFullScreen = element => {
				    if (de.requestFullscreen) {
				        de.requestFullscreen();
				    } else if (de.mozRequestFullScreen) {
				        de.mozRequestFullScreen();
				    } else if (de.webkitRequestFullScreen) {
				        de.webkitRequestFullScreen();
					}else if(div.msRequestFullScreen){
		                div.msRequestFullScreen();
		            }else {
				    	this.$Message.error('不支持全屏')
				    	return false
				    }
				}
				if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
                	this.$Message.info('当前窗口已全屏显示')
            	}else {
            		requestFullScreen();
            	}
				
				// const exitFullscreen = element => {
				// 	console.log(111)
				//     var de = document.querySelector(element) || document.documentElement;
				//     if (de.exitFullscreen) {
				//         de.exitFullscreen();
				//     	this.isScreenFull = false
				//     } else if (de.cancelFullScreen) {
				//         de.cancelFullScreen();	
				//     	this.isScreenFull = false
				//     } else if (de.mozCancelFullScreen) {
				//         de.mozCancelFullScreen();
				//     	this.isScreenFull = false
				//     } else if (de.webkitCancelFullScreen) {
				//         de.webkitCancelFullScreen();
				//     	this.isScreenFull = false
				//     } else if(document.msCancelFullScreen){
		  //               document.msCancelFullScreen();
		  //           }
				// }
				// this.isScreenFull ? exitFullscreen('#overview') : requestFullScreen('#overview');
				
				// if (!screenfull.enabled) { 
			 //        this.$Message.error('不支持全屏')
			 //        return false
			 //    }
		  //     	screenfull.toggle()
			}
		},
		created() {
			
		},
		async mounted() {
			this.init();
			this.getTradeList();
			let { status_code, data } = await api.getAreaList({parent_id: 28, per_page: 1000})
			if(status_code == 200) {
				this.areaList = data.data
				this.cityList.forEach(item => {
					let item_ = this.areaList.find(areaItem => areaItem.mc == item.name)
					item_ && (item.id = item_.id)
				})
			}
        	document.addEventListener('fullscreenchange', e => {
        		this.isScreenFull = !this.isScreenFull
        	})
			// this.getStation();
            // this.getSite();
            // this.getAllWhqy();
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		width: 100%;
		.header {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 40px;
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			background: url('../../assets/title-background.png');
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.header_left {
				display: flex;
				align-items: center;
			}
			.header_title {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 365px;
				height: 30px;
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #10F6FF;
				text-align: center;
				line-height: 30px;
				background: url('../../assets/headline.png');
				background-size: 100%;
			}

			.header_area {
				font-family: PingFangSC-Regular;
				font-size: 20px;
				text-align: left;
				color: #fff;
			}
			.header_select {
				margin-left: 40px;
				// height: 40px;
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular;
				font-size: 20px;
				text-align: left;
				color: #fff;
				.header_select_dropdown {
					position: absolute;
					top: 40px;
					left: 40px;
					z-index: 1001;
					padding: 4px 0;
					width: 200px;
					overflow: hidden;
					background: rgb(5, 27, 74);
					border-radius: 4px;
					border: 1px solid #10388c;
					box-shadow: inset 0 0 4px 0 rgba(0, 163, 255, .3);
					.header_select_dropdown_list {
						width: 100%;
						max-height: 200px;
						overflow-y: scroll;
						overflow-x: hidden;
						display: flex;
						flex-wrap: wrap;
						.header_select_dropdown_item {
							width: 60px;
							padding-left: 8px;
							box-sizing: border-box;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							text-align: left;
							color: #fff;
							line-height: 32px;
							cursor: pointer;
							&:first-child {
								width: 100%;
								border-bottom: 1px solid #fff;
							}
							&:hover {
								color: #2d8cf0;
							};
						}
					}
				}
				span {
					cursor: pointer;
					margin-right: 4px;
					font-size: 14px;
				}
				.header_select_arrow {
					width: 20px;
					height: 20px;
					transform: rotate(0deg);
					transform-origin: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.header_select_arrow_rotate1 {
					animation: rotate 0.5s;
					animation-fill-mode: forwards;
				}
				@keyframes rotate{
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(180deg);
					}
				}
				.header_select_arrow_rotate2 {
					animation: rotateBack 0.5s;
					animation-fill-mode: forwards;
				}
				@keyframes rotateBack{
					from {
						transform: rotate(180deg);
					}
					to {
						transform: rotate(0deg);
					}
				}
			}
		}
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
			height: calc(100% - 40px);
		}
		.level_box {
			position: absolute;
			top: 60px;
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
		.tool_box {
			position: absolute;
			top: 40px;
			right: 0;
			z-index: 1001;
		}
		.left {
			position: absolute;
			left: 0;
			top: 40px;
			bottom: 0;
			z-index: 1000;
			// padding-top: 48px;
			box-sizing: border-box;
			width: 400px;
			background: rgba(5,27,74,0.87);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			overflow: hidden;
			.left_box {
				width: 420px;
				height: calc(100% + 20px);
				overflow-y: scroll;
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
			top: 40px;
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
				height: calc(100% + 20px);
				overflow-y: scroll;
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
</style>