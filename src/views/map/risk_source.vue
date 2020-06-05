<template>
	<div class="map_container">
		<div class="title">风险源分布</div>
		<Divider />
		<Row type="flex" align="middle" :gutter="20">
			<Col span="6">
				<Select clearable v-model="searchFxyForm.fxdj" placeholder="风险源等级">
	                <Option v-for="item in fxdjList" :key="item.name" :value="item.name">{{item.name}}</Option>
	            </Select>
			</Col>
			<Col span="6">
				<Cascader 
	            	readonly 
	            	change-on-select
	            	v-model="searchFxyForm.fxylb" 
	            	:data="fxylbList" 
	            	:load-data="loadFxylb" 
	            	placeholder="风险源类别"></Cascader>
			</Col>
			<Col span="6">
				<Select clearable v-model="searchFxyForm.xm_id" placeholder="项目">
	                <Option v-for="item in xmData" :key="item.xm_id" :value="item.xm_id">{{item.xmmc}}</Option>
	            </Select>
			</Col>
			<Col span="6">
				<Button type="primary" icon="ios-search" @click="getFxyList">搜索</Button>
			</Col>
		</Row>
		<div id="risk_map" class="risk_source" style="height"></div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import fxylbjs from '@/common/js/fxylb'
	export default {
		name: '',
		mixins: [fxylbjs],
		data() {
			return {
				map: null,
				searchFxyForm: {
					fxdj: '',
					fxylb: [],
					xm_id: ''
				},
				xmData: [],
				fxdjList: [{
		            name: '红',
		            value: '#F25E5E',
		            color: 'red'
		        }, {
		            name: '橙',
		            value: '#F49852',
		            color: 'orange'
		        }, {
		            name: '黄',
		            value: '#EFE850',
		            color: 'yellow'
		        }, {
		            name: '蓝',
		            value: '#1C86F3',
		            color: 'blue'
		        }],
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			async getXmList() {
				let params = {
					per_page: 10000,
					page: 1,
				}
				let { status_code, data } = await api.getProjectList(params)
				if(status_code == 200) {
					this.xmData = data.data
				}
			},
			async getFxyList() {
				let params = {
					...this.searchFxyForm,
					fxylb: this.searchFxyForm.fxylb.join(','),
					per_page: 10000,
					page: 1,
				}
				let { status_code, data } = await api.getFxyList(params)
				if(status_code == 200) {
					this.fxyData = data.data
					this.fxyData.forEach(item => {
						this.drawRiskPoints(item)
					})
				}
			},
			mapInit() {
				let lo = new T.Geolocation();
		        lo.getCurrentPosition((e) => {
					this.map = new T.Map('risk_map');
					this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 9);
					this.map.setStyle('indigo')
					let ctrl = new T.Control.MapType([{
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
					},
					{
						title: '地形',
						icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png',
						layer: TMAP_TERRAIN_MAP
					},
					{
						title: '地形混合',
						icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrainpoi.png',
						layer: TMAP_TERRAIN_HYBRID_MAP
					}]); 
	            	this.map.addControl(ctrl);
	            	let zoom = new T.Control.Zoom({
	            		position: T_ANCHOR_TOP_RIGHT
	            	})
	            	this.map.addControl(zoom);
		        });
			},
			drawRiskPoints(item) {
				let self = this
				function handleClick() {
					self.showDetail(item)
				}
				let iconItem =  this.fxdjList.find(item_ => item_.name == item.fxdj)
				if(!iconItem) {
					return
				}
	            // 创建图片对象
	            let icon = new T.Icon({
	                iconUrl: require(`../../assets/point_${iconItem.color}.png`),
	                iconSize: new T.Point(48, 48),
	                iconAnchor: new T.Point(24, 48)
	            });
	            //向地图上添加自定义标注
	            let param1 = new T.LngLat(item.jd, item.wd)
	            let marker = new T.Marker(param1, {icon: icon});
	            marker.addEventListener("click", () => {
	            	var infoWin1 = new T.InfoWindow();
		            var sContent =
		                `<div style='margin:0px;'>
		                	<div style='margin: 10px; width: 235px'>
								<div style="color: #0078A8; font-weight: bold; font-size: 18px; line-height: 28px; text-align: center">${item.fxymc}</div>
								<div style="margin-top: 10px; color: #333;">
									<div>地址：${item.dz}</div>
									<div onClick=\"handleClick()\">详情：查看</div>
								</div>
		                	</div>
		                </div>`;
		            infoWin1.setContent(sContent);
		            marker.openInfoWindow(infoWin1);
	            	// this.drawRadarBox(item);
	            });
	            this.map.addOverLay(marker);
			},
			showDetail(item) {
				console.log(item)
			}
		},
		created() {
			this.getXmList()
			this.getFxyList()
			this.getFxylbList('', list => {
				this.fxylbList = list
			})
			this.mapInit()
		},
	}
</script>

<style lang="scss" scoped>
	.map_container {
		height: 100%;
		display: flex;
		flex-direction: column;
		.risk_source {
			margin-top: 16px;
			flex-grow: 1;
		}
	}
</style>