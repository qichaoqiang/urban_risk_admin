<template>
	<div class="map_container">
		<div class="title">风险区域</div>
		<Divider />
		<Row type="flex" align="middle" :gutter="20">
			<!-- <Col span="6">
				<Select clearable v-model="searchForm.name" placeholder="城市">
	                <Option v-for="item in typeList" :key="item.value" :value="item.value">{{item.name}}</Option>
	            </Select>
			</Col> -->
			<Col span="6">
				<Cascader 
	            	clearable 
	            	change-on-select
	            	v-model="searchForm.quyu_id" 
	            	:data="areaList" 
	            	:load-data="loadArea" 
	            	placeholder="区域"></Cascader>
			</Col>
			<Col span="6">
				<Select clearable v-model="searchForm.fxdj" placeholder="风险源等级">
	                <Option v-for="item in fxdjList" :key="item.name" :value="item.name">{{item.name}}</Option>
	            </Select>
			</Col>
			<Col span="6">
				<Button type="primary" icon="ios-search">搜索</Button>
			</Col>
		</Row>
		<div id="area_map" class="risk_source" style="height"></div>
	</div>
</template>

<script>
	// import map from './mixins/map'
	import areajs from '@/common/js/area'
	export default {
		name: '',
		mixins: [areajs],
		data() {
			return {
				searchForm: {
					name: '',
					fxdj: '',
					quyu_id: [],
				},
				fxdjList: [{
		            name: '重大风险',
		            value: '#F25E5E',
		            color: 'red'
		        }, {
		            name: '较大风险',
		            value: '#F49852',
		            color: 'orange'
		        }, {
		            name: '一般风险',
		            value: '#EFE850',
		            color: 'yellow'
		        }, {
		            name: '低风险',
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
			mapInit() {
				let lo = new T.Geolocation();
		        lo.getCurrentPosition((e) => {
					this.map = new T.Map('area_map');
					this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 9);
					// this.map.setStyle('indigo')
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
	            	this.map.setMapType(TMAP_HYBRID_MAP)
	            	let zoom = new T.Control.Zoom({
	            		position: T_ANCHOR_TOP_RIGHT
	            	})
	            	this.map.addControl(zoom);
		        });
			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
			})
		},
		mounted() {
			this.mapInit();
		}
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