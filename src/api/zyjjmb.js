import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addZyjjmbBase(params) {
    return fetchPost('/api/zhongyaojingjimubiaodianwei', params)
  },
  // 基本信息
  getZyjjmbBase(params) {
    return fetchGet(`/api/zhongyaojingjimubiaodianwei/${params}`)
  },
}
