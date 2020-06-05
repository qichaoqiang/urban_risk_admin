import api from '@/api/api'

export default {
	data() {
		return {
			quyuList: [],
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
			if(this.parents[0]) {
				let quyu = this.parents.map(item => item.id);
				let parentList = this.quyuList
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
							this.quyuForm.parent_id = quyu;
							this.showQuyuModel = true
						}
					})
				}
				map(quyu[depth])
			}else {
				this.showQuyuModel = true
			}
		},
		loadQuyu(item, cb) {
			item.loading = true;
			this.getArea(item.value, list => {
				item.children = list
				item.loading = false;
				cb();
			})
		},
	}
}