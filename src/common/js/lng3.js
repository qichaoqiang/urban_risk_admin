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
	},
	data() {
		return {
			lng: '',
			lat: '',
			map: null,
			showLngModel: false
		}
	},
	methods: {
		openLngModal() {
			console.log(111)
			this.showLngModel = true;
			this.$nextTick(() => {
				let self = this;
				if(this.baseInfo.lngAndLat) {
					this.lng = this.baseInfo.lngAndLat.split(' ')[0]
                    this.lat = this.baseInfo.lngAndLat.split(' ')[1]
                    this.map = new T.Map(this.id);
                    let marker = new T.Marker(new T.LngLat(this.lng, this.lat));
                    this.map.addOverLay(marker);
					this.map.centerAndZoom(new T.LngLat(this.lng, this.lat), 10);
					marker.enableDragging();
					marker.addEventListener('mouseup', (e) => {
						this.lng = e.lnglat.getLng().toFixed(6);
                    	this.lat = e.lnglat.getLat().toFixed(6);
					})
				}else {
					// let geolocation = new BMap.Geolocation();
					// geolocation.getCurrentPosition(e => {
					// 	if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
					// 		this.lng = e.point.lng.toFixed(6);
		   //                  this.lat = e.point.lat.toFixed(6);
					// 		this.map = new T.Map(this.id);
		   //                  let marker = new T.Marker(e.point);
		   //                  this.map.addOverLay(marker);
					// 		this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
					// 		marker.enableDragging();
					// 		marker.addEventListener('mouseup', (e) => {
					// 			this.lng = e.lnglat.getLng().toFixed(6);
		   //                  	this.lat = e.lnglat.getLat().toFixed(6);
					// 		})
					// 	}else {
					// 		alert('failed'+geolocation.getStatus());
					// 	}        
					// },{enableHighAccuracy: true})
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
		            	console.log(e.lnglat)
	                    this.lng = e.lnglat.lng.toFixed(6);
	                    this.lat = e.lnglat.lat.toFixed(6);
						this.map = new T.Map(this.id);
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
						marker.enableDragging();
						marker.addEventListener('mouseup', (e) => {
							this.lng = e.lnglat.getLng().toFixed(6);
	                    	this.lat = e.lnglat.getLat().toFixed(6);
						})
		            });
				}
				
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
	}
}