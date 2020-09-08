export default {
	computed: {
		mapConfig() {
			if(this.$storage.get("xm") && this.$storage.get("xm").csdtfw) {
				return this.map.getViewport(JSON.parse(this.$storage.get("xm").csdtfw))
				// console.log()
			}
			return {}
		}
	}
}