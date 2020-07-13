import $ from 'zhangjia-zepto'

export default {
	props: {
		lngAndLat: {
			default: '',
			type: String
		},
		id: {
			default: 'lng_box1',
			type: String
		},
		dz: {
			default: '',
			type: String
		},
	},
	data() {
		return {
			lng: '',
			lat: '',
			map: null,
			showLngModel: false,
			keyword: ''
		}
	},
	watch: {
		'baseInfo.lngAndLat'(val) {
			this.$emit('update:lngAndLat', val)
		},
		lngAndLat(val) {
			this.baseInfo.lngAndLat = val
		},
		dz(val) {
			if(val) {
				this.keyword = val
				this.search();
			}
		}
	},
	methods: {
		openLngModal() {
			this.showLngModel = true;
			this.$nextTick(() => {
				if(this.baseInfo.lngAndLat) {
					this.lng = this.baseInfo.lngAndLat.split(' ')[0]
                    this.lat = this.baseInfo.lngAndLat.split(' ')[1]
                    this.map = new T.Map(this.id);
                    let marker = new T.Marker(new T.LngLat(this.lng, this.lat));
                    this.map.addOverLay(marker);
					this.map.centerAndZoom(new T.LngLat(this.lng, this.lat), 10);
					this.map.addEventListener("click", ( {lnglat} )=>{
						this.addMark(lnglat.lng, lnglat.lat)
					});
				}else {
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
		            	console.log(e.lnglat)
	                    this.lng = e.lnglat.lng.toFixed(6);
	                    this.lat = e.lnglat.lat.toFixed(6);
						this.map = new T.Map(this.id);
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
						this.map.addEventListener("click", ( {lnglat} )=>{
							this.addMark(lnglat.lng, lnglat.lat)
						});
		            });
				}
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
			})
		},
		saveLng() {
			this.baseInfo.lngAndLat = `${this.lng} ${this.lat}`
			this.showLngModel = false
			this.$nextTick(() => {
				this.map = null;
				this.lng = '';
				this.lat = ''
			})
		},
		search() {
			let self = this
			$.ajax({
				type: 'get',
				url: 'http://api.tianditu.gov.cn/geocoder',
				data: {
					ds: `{"keyWord":"${this.keyword}"}`,
					tk: '701640b81eacb6c191dd460f74393688'
				},
				dataType: 'json',
				success(res) {
					let {status, location, msg} = res
					if(status == '0') {
						self.addMark(location.lon, location.lat)
					}else {
						self.$Message.error(msg || '未查询到结果')
					}
				},
				error(err) {
					self.$Message.error('未查询到结果')
				}
			})
		},
		addMark(lng, lat){ //添加标注
			this.map.clearOverLays()
			var marker = new T.Marker(new T.LngLat(lng, lat));
			this.map.addOverLay(marker);
			this.lng = lng.toFixed(6)
			this.lat = lat.toFixed(6)
			this.baseInfo.lngAndLat = `${this.lng} ${this.lat}`
			this.map.centerAndZoom(new T.LngLat(lng, lat), 15);
		},
	}
}