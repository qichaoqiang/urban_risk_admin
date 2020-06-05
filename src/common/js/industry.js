import api from '@/api/api'

export default {
	data() {
		return {
			industryList: [],
			industryLoading: this.$route.query.type == '2'
		}
	},
	methods: {
		async getIndustry(parent_id, cb, index) {
			let list = []
			let { status_code, data } = await api.getIndustryList({parent_id, per_page: 1000,})
			if(status_code == 200) {
				list = data.data.map(item => {
					let item_ = {
						value: item.id,
						parent_id: item.parent_id,
                        label: item.hymc,
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
		getHy() {
			if(this.form.fhybhc_bhzj) {
				let hyml = this.form.fhybhc_bhzj.split(',').map(item => parseInt(item));
				let parentList = this.industryList
				let parent = null
				let depth = 0
				const map = id => {
					this.getIndustry(id, list => {
						// this.industryList = list
						parent = parentList.find(item_ => {
							return id == item_.value
						});
						parent.children = list;
						parentList = parent.children
						if(++depth < hyml.length) {
							map(hyml[depth])
						}else {
							this.baseInfo.hyml = hyml;
							this.industryLoading = false
							if(this.baseInfo.quyu && this.form.fqybhc_bhzj) {
								this.loading = this.baseInfo.quyu.length == 0
							}else {
								this.loading = false
							}
						}
					})
				}
				map(hyml[depth])
			}else {
				this.industryLoading = false
				this.loading = false
			}
			
		},
		loadIndustry(item, cb) {
			if(this.industryLoading) {
				cb();
			}else {
				item.loading = true;
				this.getIndustry(item.value, list => {
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