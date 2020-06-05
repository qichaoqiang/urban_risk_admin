import api from '@/api/api'

export default {
	data() {
		return {
			fxylbList: [],
		}
	},
	methods: {
		async getFxylbList(parent_id, cb) {
			let list = []
			let { status_code, data } = await api.getFxylbList({parent_id, per_page: 1000, page: 1})
			if(status_code == 200) {
				list = data.data.map(item => {
					let item_ = {
						...item,
						value: this.fxylbValue ? item[this.fxylbValue] : item.dm,
						parent_id: item.parent_id,
                        label: item.fxylbmc,
                        children: [],
					}
					if(item.yzj == 1) {
						item_.loading = false
					}
					return item_
				})
			}
			cb && cb(list)
		},
		getFxylb() {
			if(this.parents[0]) {
				let ids = this.parents.map(item => item.id);
				let parentList = this.fxylbList
				let parent = null
				let depth = 0
				const map = id => {
					this.getFxylbList(id, list => {
						// this.industryList = list
						parent = parentList.find(item_ => {
							return id == item_.value
						});
						parent.children = list;
						parentList = parent.children
						if(++depth < ids.length) {
							map(ids[depth])
						}else {
							this.fxylbForm.parent_id = ids
							this.showFxylbModel = true
						}
					})
				}
				map(ids[depth])
			}else {
				this.showFxylbModel = true
			}
		},
		loadFxylb(item, cb) {
			item.loading = true;
			this.getFxylbList(item.id, list => {
				item.children = list
				item.loading = false;
				cb();
			})
		},
	}
}