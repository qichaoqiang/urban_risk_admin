import { fetchPost, fetchGet, fetchDelete, fetchPostFile } from './axios'
export default {
	// 区域列表
	getAreaList(params) {
		return fetchGet('/api/quyu', params)
	},
	// 区域保存
	addQuyuItem(params) {
		return fetchPost('/api/quyu', params)
	},
  	// 区域删除
  	deleteQuyuItem(id) {
  		return fetchDelete(`/api/quyu/${id}`)
  	},
}
