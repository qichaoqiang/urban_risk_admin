import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 角色保存
  addRoleItem(params) {
    return fetchPost('/api/juese', params)
  },
  // 角色列表
  getRoleList(params) {
    return fetchGet('/api/juese', params)
  },
  // 角色列表
  getRoleInfo(params) {
    return fetchGet(`/api/juese/${params}`)
  },
  // 角色删除
  deleteRoleItem(id) {
    return fetchDelete(`/api/juese/${id}`)
  },
  // 权限列表
  getAuthList(params) {
    return fetchGet('/api/quanxianliebiao', params)
  },
}
