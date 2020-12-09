import api from '@/api/api'

export default {
	data() {
		return {
			areaList: [],
		}
	},
	methods: {
		async getArea(parent_id, cb) {
			let list = []
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
		getQy() {
			if(this.form.fqybhc_bhzj) {
				let quyu = this.form.fqybhc_bhzj.split(',').map(item => parseInt(item));
				let parentList = this.areaList
				let parent = null
				let depth = 0
				const map = id => {
					this.getArea(id, list => {
						// this.industryList = list
						parent = parentList.find(item_ => {
							return id == item_.value
						});
						parent.children = list;
						parentList = parent.children
						if(++depth < quyu.length) {
							map(quyu[depth])
						}else {
							this.baseInfo.quyu = quyu;
							console.log(this.baseInfo.quyu)
							if(this.baseInfo.hyml && this.form.fhybhc_bhzj) {
								this.loading = this.baseInfo.hyml.length == 0
							}else {
								this.loading = false
							}
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
	}
}