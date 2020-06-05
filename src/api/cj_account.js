import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 修改采集账号密码
  changeCjaccountPassword(params) {
    return fetchPost('/api/caijizhanghao', params)
  },
  // 采集账号列表
  getCjaccountList(params) {
    return fetchGet('/api/caijizhanghao', params)
  },
  // 采集账号删除
  deleteCjaccountItem(id) {
    return fetchDelete(`/api/caijizhanghao/${id}`)
  },
}
