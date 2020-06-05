<template>
	<div class="container" style="min-width: 1200px">
		<div class="header">
			<div class="header_left">
				<!-- <div class="header_select" @click="handleSelectLeft">
					<span :style="{color: showLeft ? '#10F6FF' : '#fff'}">{{area}}</span>
					<div class="header_select_arrow" id="header_select_arrow" :class="{header_select_arrow_rotate1: !showLeft, header_select_arrow_rotate2: showLeft}">
						<Icon type="md-arrow-dropup" :color="showLeft ? '#10F6FF' : '#fff'" />
					</div>
				</div> -->
				<div class="header_area" @click="clearAll" v-show="cityName">{{cityName}}市</div>
				<Dropdown :transfer="true" trigger="click" placement="right-start" @on-click="selectArea" @on-visible-change="visibleChange">
					<div class="header_select">
					<span>{{area}}</span>
					<div class="header_select_arrow" id="header_select_arrow" :class="{header_select_arrow_rotate1: !areaVisible, header_select_arrow_rotate2: areaVisible}">
						<Icon type="md-arrow-dropup" />
					</div>
				</div>
					<DropdownMenu slot="list">
            			<DropdownItem name="all">全部</DropdownItem>
            			<DropdownItem v-for="item in cityList" :key="item.dropName" :name="item.dropName">{{item.name}}</DropdownItem>
            		</DropdownMenu>
				</Dropdown>
			</div>
			<div class="header_title" v-show="cityName">{{cityName}}市风险地图</div>
			<div class="header_right">
				<!-- <div class="header_right_name">{{username}}</div> -->
				<Dropdown :transfer="true" placement="bottom-end" @on-click="logout">
					<div class="header_right_content">
						<img class="header_right_img" src="@/assets/register.png">
						<div class="header_right_name">{{username}}</div>
					</div>
					<DropdownMenu slot="list">
            			<DropdownItem name="logout">退出登录</DropdownItem>
            		</DropdownMenu>
				</Dropdown>
			</div>
		</div>
		<div class="mapDiv" id="mapDiv"></div>
		<!-- <div class="level_box" ref="level_box">
			<div class="level_item" v-for="item in levelList" :key="item.color" style="width: 112px; height: 28px;">
				<div class="level_item_name">{{item.name}}</div>
				<div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
			</div>
		</div> -->
		<div class="level_box" ref="level_box">
			<div class="level_item" v-for="item in iconList" :key="item.color" style="width: 112px; height: 28px;">
				<div class="level_item_name">{{item.name}}</div>
				<div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
			</div>
		</div>
		<div class="left" id="left" v-show="false">
			<risk-detail :data="riskInfo" :currentRisk="currentRisk"  @drawRiskSource="handleDrawRiskSource"></risk-detail>
			<div class="close" @click="handleSelectLeft(false)"></div>
		</div>
		<div class="select_trade" v-show="!showRight" @click="handleSelectRight(true)" style="padding: 12px 0 4px; width: 88px;">
			<img src="@/assets/ic_consult_call.png" style="width
			40px; height: 40px">
			<div class="select_trade_text" style="margin: 12px 0 4px; font-size: 14px; line-height: 20px;">行业分类</div>
			<Icon type="ios-arrow-down" size="12px" color="#ffffff"/>
		</div>
		<div class="trade_box" id="right" v-show="false">
			<trade-box :data="tradeList"></trade-box>
			<div class="close" @click="handleSelectRight(false)"></div>
		</div>
		<!-- <div class="bottom" :class="{bottom_left: showLeft, bottom_right: showRight}" v-if="!reset">
			<risk-time></risk-time>
		</div> -->
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
	import axios from 'axios'
	import $ from 'jquery'
	import tradeList from '@/utils/trade'
	import LeftBox from '@/components/left/index'
	import TradeBox from '@/components/right/index'
	import RiskTime from '@/components/bottom/index'
	import RiskDetail from '@/components/left/riskDetail'
	import api from '@/api/api'
	import storage from 'good-storage'
	export default {
		name: '',
		data() {
			return {
				cityName: '',
				username: storage.get('username'),
				area: '全部',
				showLeft: false,
				showRight: false,
				tradeList,
				reset: false,
				map: null, // 地图
				polygon: null, // 面对象
				cityList: [
					{"name": "上城区", dropName: "sc", "polygon": null, color: '#ed4014', index: 0},
					{"name": "下城区", dropName: "xc", "polygon": null, color: '#19be6b', index: 0},
					{"name": "西湖区", dropName: "xh", "polygon": null, color: '#808695', index: 1},
					{"name": "江干区", dropName: "jg", "polygon": null, color: '#f90', index: 0},
					{"name": "拱墅区", dropName: "gs", "polygon": null, color: '#17233d', index: 0},
					{"name": "滨江区", dropName: "bj", "polygon": null, color: '#2b85e4', index: 0},
					{"name": "萧山区", dropName: "xs", "polygon": null, color: '#2be498', index: 0},
					{"name": "余杭区", dropName: "yh", "polygon": null, color: '#ade42b', index: 0},
					{"name": "临安区", dropName: "la", "polygon": null, color: '#e48a2b', index: 0},
					{"name": "富阳区", dropName: "fy", "polygon": null, color: '#e42bdd', index: 0},
					{"name": "建德市", dropName: "jd", "polygon": null, color: '#7c2be4', index: 0},
					{"name": "桐庐县", dropName: "tl", "polygon": null, color: '#402be4', index: 0},
					{"name": "淳安县", dropName: "ca", "polygon": null, color: '#e42b99', index: 0}
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
		        }, {
		            name: '较大风险',
		            color: '#F49852',
		        }, {
		            name: '一般风险',
		            color: '#EFE850',
		        }, {
		            name: '低风险',
		            color: '#1C86F3',
		        }],
		        stationList: [],
		        allTrade: [],
		        areaVisible: false,
		        riskInfo: {}, // 风险点详细信息
		        currentRisk: {}, // 当前点击风险点
		        infoWin: null, // 重大风险源信息
			}
		},
		components: {
			TradeBox,
			LeftBox,
			RiskTime,
			RiskDetail
		},
		watch: {
			area(val) {
				// if(val == '全部' && this.showRight) {
				// 	$('#right').slideUp();
				// 	this.showRight = false;
				// }
				this.map.clearOverLays();
				this.drawMunicipios();
			},
			showLeft(val) {
				if(val) this.$refs.level_box.style.left = '22.5%';
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
						let list = val.split(',');
						getIntersection(list, ['14', '15', '16']).length > 0 && this.drawSubwayLine();
						getIntersection(list, ['3', '4', '5']).length > 0 && this.getWhqy(getIntersection(list, ['3', '4', '5']));
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
	            this.map.setStyle('indigo') // 修改地图风格
	            this.map.disableDoubleClickZoom() // 禁止双击放大
	            this.map.setMinZoom(4);
            	this.map.setMaxZoom(14);
            	let ctrl = new T.Control.MapType([
            		{
						title: '地图', //地图控件上所要显示的图层名称
						icon:'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png', //地图控件上所要显示的图层图标（默认图标大小80x80）
						layer: TMAP_NORMAL_MAP //地图类型对象，即MapType。
					},
					{
						title: '卫星',
						icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png',
						layer: TMAP_SATELLITE_MAP
					},
					{
						title: '卫星混合',
						icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png',
						layer: TMAP_HYBRID_MAP
					}]); 
            	this.map.addControl(ctrl); // 增加地图类型控件
	            this.drawMunicipios();
			},
			// 区域选择
			selectArea(name) {
				if(name == 'all') {
					this.area = '全部'
				}else {
					this.area = this.cityList.filter(item => item.dropName == name)[0].name;
				}
			},
			visibleChange(status) {
				this.areaVisible = status;
			},
			// 绘制县区覆盖物
			drawMunicipios() {
				let self = this;
				this.cityList.forEach(item => {
	            	let searchWord = item.name;
					axios.get(`http://api.tianditu.gov.cn/administrative?postStr={"searchWord":"${searchWord}","searchType":"1","needSubInfo":"false","needAll":"false","needPolygon":"true","needPre":"true"}&tk=701640b81eacb6c191dd460f74393688`).then(res => {
						let arr = res.data.data[item.index].points[0].region.split(',')
						let points = [];
						let point = ''
						arr.forEach(item => {
							point = item.split(' ');
							points.push(new T.LngLat(point[0], point[1]));
						})
						// #008192
						item.polygon = new T.Polygon(points, {
			                color: '#008192', weight: 2, opacity: 1, fillColor: item.color, fillOpacity: 0
			            });
			            item.polygon.addEventListener("click", () => {
			            	// self.area = item.name;
			            });
						this.map.addOverLay(item.polygon);
					})
	            })
			},
			// 绘制地铁线路
			drawSubwayLine() {
				// let points = [];
				// points.push(new T.LngLat(119.94697500, 30.26005300));
				// points.push(new T.LngLat(120.33201400, 30.17535100));
				// let line = new T.Polyline(points);
				// this.map.addOverLay(line);
				this.stationList.forEach(item => {
					let points = [];
					item.station.forEach(item_ => {
						this.drawSubwayStation(item_);
						points.push(new T.LngLat(item_.station_lng, item_.station_lat));
					})
					let line = new T.Polyline(points, {
		                color: item.color, weight: 5, opacity: 1
		            });
					this.map.addOverLay(line);
				})
			},
			// 绘制地铁站点
			drawSubwayStation(item) {
				let self = this;
	            //创建图片对象
	            let icon = new T.Icon({
	                iconUrl: require(`../../assets/risk-point/地铁专题-4.png`),
	                iconSize: new T.Point(9, 12),
	                iconAnchor: new T.Point(4, 12)
	            });
	            //向地图上添加自定义标注
	            let marker = new T.Marker(new T.LngLat(item.station_lng, item.station_lat), {icon: icon});
	            marker.addEventListener("click", () => {
	            	// self.drawRadarBox(item);
	            });
	            this.map.addOverLay(marker);
			},
			drawRiskMap() {
				this.map.clearOverLays();
				let elemList = document.getElementsByClassName('radar_box');
				while(elemList.length > 0) {
					elemList[0].remove();
				}
				let levelList = this.$store.state.levelIds.split(',');
				let riskPoints = [];
				this.riskPoints.forEach(item => {
					item.hasRadar = false;
					item.pdefinedOverlay = null;
	            	levelList.includes(item.level + '') && riskPoints.push(item);
	            });
	            riskPoints.forEach(item => {
	            	this.drawAnnotations(item)
	            })
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
				// let self = this;
				// if(item.hasRadar) {
				// 	document.getElementById(`radar_box${item.id}`).style.display = "none"
				// 	item.hasRadar = false;
				// 	return false;
				// }else {
				// 	if(item.pdefinedOverlay) {
				// 		document.getElementById(`radar_box${item.id}`).style.display = 'flex'
				// 		item.hasRadar = true;
				// 	}else {
				// 		let definedOverlay = T.Overlay.extend({
			 //                initialize: function (lnglat, text, text2, options) {
			 //                    this.lnglat = lnglat;
			 //                    this.setOptions(options);
			 //                    this._text = text;
			 //                    this._overText = text2;
			 //                },
			 //                onAdd: function (map) {	
			 //                    this.map = map;
			 //                    let div = this._div = document.createElement("div");
			 //                    div.setAttribute('id', `radar_box${item.id}`);
			 //                    div.style.background = `url(${require('../../assets/point-up.png')})`;
				// 				div.style.backgroundSize = '100% 100%';
				// 				div.style.position = 'absolute';
				// 				div.style.zIndex = '1000000';
				// 				div.style.width = '140px';
				// 				div.style.height = '178px';
				// 				div.style.padding = '12px 0';
				// 				div.style.MozUserSelect = 'none';
				// 				div.style.display = 'flex';
				// 				div.style.flexDirection = 'column';
				// 				div.style.alignItems = 'center';
		  //                   	if(item.station_name) {
		  //                   		let title = `<div style="fontFamily: PingFangSC-Medium; fontSize: 16px; color: #FFFFFF; lineHeight: 22px">${item.station_name}</div>`;
		  //                   		div.innerHTML = title;
		  //                   	}else {
		  //                   		let title = `<div style="fontFamily: PingFangSC-Medium; fontSize: 16px; color: #FFFFFF; lineHeight: 22px">${item.type}</div>`;
				//                     let line1 = `<div style="margin-top: 12px; margin-left: 12px; width: 99px; height: 1px; background: linear-gradient(270deg, rgba(10,44,104,0.00) 0%, #10F6FF 49%, rgba(10,42,102,0.00) 100%);"></div>`
				//                     let level = `<div style="margin: 4px 0; width: 100%; font-family: PingFangSC-Medium; font-size: 14px; color: ${self.levelList[item.level].color}; line-height: 20px">${self.levelList[item.level].name}</div>`
				//                     let line2 = `<div style="margin-right: 12px; width: 99px; height: 1px; background: linear-gradient(270deg, rgba(10,44,104,0.00) 0%, #10F6FF 49%, rgba(10,42,102,0.00) 100%);"></div>`
				//                     let radar = `<div style="margin-top: 12px; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
			 //                    				<div style="position: relative; width: 48px;height: 48px">
			 //                    					<div style="position: absolute; bottom: 48px; font-family: PingFangSC-Regular; font-size: 12px; color: #FFFFFF; text-align: left; line-height: 16px; transform: scale(0.91);">危险物质</div>
			 //                    					<div style="position: absolute; left: 48px; top: 16px; font-family: PingFangSC-Regular; font-size: 12px; color: #FFFFFF; text-align: left; line-height: 16px; transform: scale(0.91); white-space: nowrap;">人员</div>
			 //                    					<div style="position: absolute; top: 48px; font-family: PingFangSC-Regular; font-size: 12px; color: #FFFFFF; text-align: left; line-height: 16px; transform: scale(0.91);">周边环境</div>
			 //                    					<div style="position: absolute; right: 48px; top: 16px; font-family: PingFangSC-Regular; font-size: 12px; color: #FFFFFF; text-align: left; line-height: 16px; transform: scale(0.91); white-space: nowrap;">设备</div>
			 //                    					<div id="radar${item.id}" style="width: 48px;height: 48px">
			 //                    				</div>
			 //                    			</div>
			 //                    		</div>
			 //                    	</div>`;
		  //                   		div.innerHTML = `${title}${line1}${level}${line2}${radar}`
		  //                   	}
			 //                    map.getPanes().overlayPane.appendChild(this._div);
			 //                    if(!item.station_name) {
			 //                    	let myChart = echarts.init(document.getElementById(`radar${item.id}`));
				// 					myChart.setOption({
				// 					    radar: {
				// 					        indicator: [
				// 					            {name: '危险物质', max: 200},
				// 					            {name: '人员', max: 200},
				// 					            {name: '周边环境', max: 200},
				// 					            {name: '设备', max: 200},
				// 					        ],
				// 					        shape: 'circle',
				// 					    	radius: 23,
				// 					        splitNumber: 3,
				// 					        name: {
				// 					        	show: false,
				// 					            textStyle: {
				// 					                color: '#fff',
				// 					                fontSize: 12
				// 					            }
				// 					        },
				// 					        splitLine: {
				// 					            lineStyle: {
				// 					                color: '#fff'
				// 					            }
				// 					        },
				// 					        splitArea: {
				// 					            show: false
				// 					        },
				// 					        axisLine: {
				// 					            lineStyle: {
				// 					                color: '#fff'
				// 					            }
				// 					        }
				// 					    },
				// 			            tooltip: {
				// 			                trigger: 'axis'
				// 			            },
				// 					    series: [
				// 					        {
				// 					            name: '风险点信息',
				// 					            type: 'radar',
				// 					            lineStyle: {
				// 								    normal: {
				// 								        width: 1,
				// 								        opacity: 0.5
				// 								    }
				// 								},
				// 					            data: [{
				// 					            	value: [item.riskMatter, item.people, item.environment, item.device]
				// 					            }],
				// 					            symbol: 'none',
				// 					            itemStyle: {
				// 					                color: 'rgb(16,246,255)'
				// 					            },
				// 					            lineStyle: {
				// 					            	color: '#10F6FF'
				// 					            },
				// 					            areaStyle: {
				// 					                opacity: 0.8
				// 					            }
				// 					        }
				// 					    ]
				// 					});
			 //                    }
			 //                    this.update(this.lnglat);
			 //                },

			 //                onRemove: function () {
			 //                	if(this.div) {
			 //                		let parent = this.div.parentNode;
				//                     if (parent) {
				//                         parent.removeChild(this.div);
				//                         this.map = null;
				//                         this.div = null;
				//                     }
			 //                	}
			 //                },

			 //                setLnglat: function (lnglat) {
			 //                    this.lnglat = lnglat;
			 //                    this.update();
			 //                },
			 //                getLnglat: function () {
			 //                    return this.lnglat;
			 //                },
			 //                setPos: function (pos) {
			 //                    this.lnglat = this.map.layerPointToLngLat(pos);
			 //                    this.update();
			 //                },
			 //                update: function () {
			 //                    let pos = this.map.lngLatToLayerPoint(this.lnglat);
			 //                    this._div.style.top = ( pos.y - 206) + "px";
			 //                    this._div.style.left = (pos.x - 70) + "px";
		  //               	}
			 //            });
			 //            let point
			 //            if(item.station_name) {
			 //            	point = new T.LngLat(item.station_lng, item.station_lat);
			 //            }else {
			 //            	point = new T.LngLat(item.y, item.x);
			 //            }
			 //            item.pdefinedOverlay = new definedOverlay(point, "天坛公园", "北京市东城区天坛东路甲1号", {});
			 //            this.map.addOverLay(item.pdefinedOverlay);
			 //            item.hasRadar = true
				// 	}
				// }
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
				this.showRight = bool
				this.$nextTick(() => {
					this.reset = false
				})
			}, 
			// 获取行业类目
			getTradeList() {
				api.getTradeList({}).then(res => {
					if(res.ret == 0) {
						this.allTrade = res.data;
						let list = this.toTree(res.data, 1);
						this.$store.dispatch('save_tradeList', list);
					}else {

					}
				})
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
			        var parent = map[item.parentId]
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
			getStation() {
				api.getStation({}).then(res => {
					if(res.ret == 0) {
						this.stationList = res.data;
					}
				})
			},
			getSite() {
				api.getSite({}).then(res => {
					if(res.ret == 0) {
						this.cityName = res.city_name;
					}
				})
			},
			// 危险化学品
			getWhqy(list) {
				this.allTrade.forEach(item => {
					if(list.includes(item.id + '')) {
						let params = this.area == '全部' ? {
							act: 'get_all_dangersource',
							enterprise_type: item.info,
						} : {
							enterprise_type: item.info,
							area_name: this.area
						}
						api.getWhqy(params).then(res => {
							if(res.ret == 0) {
								res.data.forEach((item, index) => {
									this.drawAnnotations(item, '危险化学品')
								})
							}
						})
					}
				})
			},
			getAllWhqy() {
				let params = {
					act: 'get_all_dangersource'
				}
				api.getWhqy(params).then(res => {
					
				})
			},
			logout() {
				storage.clear()
				this.$router.replace('/login');
			}
		},
		created() {
			
		},
		mounted() {
			this.init();
			this.getTradeList();
			this.getStation();
            this.getSite();
            // this.getAllWhqy();
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		.header {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 98px;
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			background: url('../../assets/title-background.png');
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow-y: auto;
			.header_left {
				position: absolute;
				left: 60px;
				top: 50%;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				.header_area {
					font-family: PingFangSC-Regular;
					font-size: 20px;
					text-align: left;
					color: #fff;
				}
				.header_select {
					margin-left: 40px;
					// height: 98px;
					display: flex;
					align-items: center;
					font-family: PingFangSC-Regular;
					font-size: 20px;
					text-align: left;
					color: #fff;
					span {
						cursor: pointer;
						margin-right: 4px;
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
			.header_title {
				width: 899px;
				height: 74px;
				font-family: PingFangSC-Semibold;
				font-size: 36px;
				color: #10F6FF;
				text-align: center;
				line-height: 74px;
				background: url('../../assets/headline.png');
				background-size: 100%;
			}
			.header_right {
				position: absolute;
				right: 60px;
				top: 50%;
				z-index: 1000;
				transform: translateY(-50%);
				.header_right_content {
					height: 98px;
					display: flex;
					align-items: center;
					cursor: pointer;
					// overflow-y: auto;
					.header_right_img {
						margin-right: 12px;
						width: 36px;
						height: 36px;
					}
					.header_right_name {
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: #FFFFFF;
						text-align: left;
					}
				}
			}
		}
		.mapDiv {
			position: fixed;
			left: 0;
			right: 0;
			top: 98px;
			bottom: 0;
			z-index: 100;
		}
		.level_box {
			position: absolute;
			top: 130px;
			left: 32px;
			z-index: 1000;
			.level_item {
				margin-bottom: 12px;
				padding: 0 16px;
				display: flex;
				align-items: center;
				background: url('../../assets/frame.png');
				background-size: 100% 100%;
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
			position: fixed;
			left: 0;
			top: 98px;
			bottom: 0;
			z-index: 101;
			padding-top: 48px;
			box-sizing: border-box;
			width: 400px;
			background: rgba(5,27,74,0.87);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			overflow: scroll;
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
			position: fixed;
			right: 0;
			top: 98px;
			bottom: 0;
			z-index: 101;
			box-sizing: border-box;
			width: 400px;
			background: rgba(5,27,74,0.87);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			overflow: scroll;
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
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 100;
			background: rgba(5,27,74,0.87);
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
	}
</style>