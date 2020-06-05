import api from '@/api/api'

export default {
	data() {
		return {
			xmsslxList: [],
		}
	},
	methods: {
		async getXmsslx(parent_id, cb) {
			let list = []
			let { status_code, data } = await api.getXmsslxList({parent_id, per_page: 1000,})
			if(status_code == 200) {
				list = data.data.map(item => {
					let item_ = {
						value: item.id,
						parent_id: item.parent_id,
                        label: item.qm,
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
		getXm() {
			if(this.form.flxbhc_bhzj) {
				let xmsslx = this.form.flxbhc_bhzj.split(',').map(item => parseInt(item));
				let parentList = this.xmsslxList
				let parent = null
				let depth = 0
				const map = id => {
					this.getXmsslx(id, list => {
						parent = parentList.find(item_ => {
							return id == item_.value
						});
						parent.children = list;
						parentList = parent.children
						if(++depth < xmsslx.length) {
							map(xmsslx[depth])
						}else {
							this.baseInfo.xmsslx = xmsslx;
							console.log(this.baseInfo.xmsslx)
							if(this.baseInfo.quyu) {
								this.loading = this.baseInfo.quyu.length == 0
							}else {
								this.loading = false
							}
						}
					})
				}
				map(xmsslx[depth])
			}else {
				this.loading = false
			}
			
		},
		loadXmsslx(item, cb) {
			if(this.loading) {
				cb();
			}else {
				item.loading = true;
				this.getXmsslx(item.value, list => {
					// if(list.length == 0) {
					// 	item.children = undefined
					// }else {
					// 	item.children = list
					// }
					item.children = list
					item.loading = false;
					cb();
				})
			}
		},
	},
}