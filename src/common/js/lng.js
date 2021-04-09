export default {
	data() {
		return {
			showLngModel: false
		}
	},
	methods: {
		openLngModal() {
			this.showLngModel = true;
			this.$nextTick(() => {
				let self = this;
				if(this.addressInfo.lngAndLat) {
					this.lng = this.addressInfo.lngAndLat.split(' ')[0]
                    this.lat = this.addressInfo.lngAndLat.split(' ')[1]
                    this.map = new T.Map('lng_box');
                    let marker = new T.Marker(new T.LngLat(this.lng, this.lat));
                    this.map.addOverLay(marker);
					this.map.centerAndZoom(new T.LngLat(this.lng, this.lat), 10);
					marker.enableDragging();
					marker.addEventListener('mouseup', (e) => {
						this.lng = e.lnglat.getLng().toFixed(6);
                    	this.lat = e.lnglat.getLat().toFixed(6);
					})
				}else {
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
	                    this.lng = e.point.lng.toFixed(6);
	                    this.lat = e.point.lat.toFixed(6);
						this.map = new T.Map('lng_box');
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
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
			this.addressInfo.lngAndLat = `${this.lng} ${this.lat}`
			this.showLngModel = false
			this.$nextTick(() => {
				this.map = null;
				this.lng = '';
				this.lat = ''
			})
		},
	}
}