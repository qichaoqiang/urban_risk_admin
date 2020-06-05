import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWxhxpSyBase(params) {
    return fetchPost('/api/weixianhuaxuepinshiyongqiye', params)
  },
  // 基本信息
  getWxhxpSyBase(params) {
    return fetchGet(`/api/weixianhuaxuepinshiyongqiye/${params}`)
  },
}
