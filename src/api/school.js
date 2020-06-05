import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 学校基本信息保存
  addSchoolBase(params) {
    return fetchPost('/api/xuexiao', params)
  },
  // 学校
  getSchoolBase(params) {
    return fetchGet(`/api/xuexiao/${params}`)
  },
  // 危险化学品（实验室）保存
  addWhsysItem(params) {
    return fetchPost('/api/shiyanshiweixianhuaxuepin', params)
  },
  // 危险化学品（实验室）列表
  getWhsysItemList(params) {
    return fetchGet('/api/shiyanshiweixianhuaxuepin', params)
  },
  // 危险化学品（实验室）删除
  deleteWhsysItem(id) {
    return fetchDelete(`/api/shiyanshiweixianhuaxuepin/${id}`)
  },
}
