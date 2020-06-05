import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 旅游景点基本信息保存
  addTravelBase(params) {
    return fetchPost('/api/lyuyouchangsuo', params)
  },
  // 旅游景点
  getTravelBase(params) {
    return fetchGet(`/api/lyuyouchangsuo/${params}`)
  },
  // 特殊旅游项目保存
  addTravelItem(params) {
    return fetchPost('/api/teshulyuyouxiangmu', params)
  },
  // 特殊旅游项目列表
  getTravelItemList(params) {
    return fetchGet('/api/teshulyuyouxiangmu', params)
  },
  // 特殊旅游项目删除
  deleteTravelItem(id) {
    return fetchDelete(`/api/teshulyuyouxiangmu/${id}`)
  },
  // 文物保护单位保存
  addWw(params) {
    return fetchPost('/api/wenwubaohudanwei', params)
  },
  // 文物保护单位列表
  getWwList(params) {
    return fetchGet('/api/wenwubaohudanwei', params)
  },
  // 文物保护单位删除
  deleteWw(id) {
    return fetchDelete(`/api/wenwubaohudanwei/${id}`)
  },
  // 消防重点单位保存
  addXf(params) {
    return fetchPost('/api/xiaofangzhongdiandanwei', params)
  },
  // 消防重点单位列表
  getXfList(params) {
    return fetchGet('/api/xiaofangzhongdiandanwei', params)
  },
  // 消防重点单位删除
  deleteXf(id) {
    return fetchDelete(`/api/xiaofangzhongdiandanwei/${id}`)
  },
  // 特种设备保存
  addSpecial(params) {
    return fetchPost('/api/tezhongshebei', params)
  },
  // 特种设备列表
  getSpecialList(params) {
    return fetchGet('/api/tezhongshebei', params)
  },
  // 特种设备删除
  deleteSpecial(id) {
    return fetchDelete(`/api/tezhongshebei/${id}`)
  },
}
