import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 管理员账号保存
  addAdminItem(params) {
    return fetchPost('/api/guanliyuan', params)
  },
  // 管理员账号列表
  getAdminList(params) {
    return fetchGet('/api/guanliyuan', params)
  },
  // 管理员账号删除
  deleteAdminItem(id) {
    return fetchDelete(`/api/guanliyuan/${id}`)
  },
}
