import api from '@/api/api'

export default {
	data() {
		return {
			areaList: [],
			quyuList: []
		}
	},
	methods: {
		async getArea(parent_id, cb) {
			let list = []
			console.log(111111)
			let { status_code, data } = await api.getAreaList({parent_id, per_page: 1000})
			if(status_code == 200) {
				list = data.data.map(item => {
					let item_ = {
						value: item.id,
						parent_id: item.parent_id,
                        label: item.mc,
                        children: []
					}
					if(item.yzj == 1) {
						item_.loading = false
					}
					return item_
				})
			}
			cb && cb(list)
		},
		getQy(cb) {
			if(this.fxyInfo.fqybhc_bhzj) {
				let quyu = this.fxyInfo.fqybhc_bhzj.split(',').map(item => parseInt(item));
				let parentList = this.quyuList
				let parent = null
				let depth = 0
				const map = id => {
					this.getArea(id, list => {
						// this.industryList = list
						parent = parentList.find(item_ => {
							console.log(id, item_.value)
							return id == item_.value
						});
						console.log(parent)
						parent.children = list;
						parentList = parent.children
						if(++depth < quyu.length) {
							map(quyu[depth])
						}else {
							console.log(parent)
							this.fxyInfo.quyu = parent.label;
							this.showInfoModel = true
							this.$nextTick(() => {
								cb && cb()
							})
						}
					})
				}
				map(quyu[depth])
			}else {
				this.loading = false
			}
			
		},
		loadArea(item, cb) {
			item.loading = true;
			this.getArea(item.value, list => {
				item.children = list
				item.loading = false;
				cb();
			})
		},
	},
	mounted() {
		this.getArea('', list => {
			this.quyuList = list
		})
	}
}