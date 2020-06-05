import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWxhxpCcBase(params) {
    return fetchPost('/api/weixianhuaxuepinchucunqiye', params)
  },
  // 基本信息
  getWxhxpCcBase(params) {
    return fetchGet(`/api/weixianhuaxuepinchucunqiye/${params}`)
  },
}
