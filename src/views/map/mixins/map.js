export default {
	data() {
		return {
			map: null,
			typeList: [
				{
					value: 1,
					name: 'xxxx'
				}
			],
		}
	},
	mounted() {
		let self = this;
		let lo = new BMap.Geolocation();
        lo.getCurrentPosition((e) => {
			this.map = new T.Map('risk_map');
			this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
			this.map.setStyle('indigo')
        });
	}
}