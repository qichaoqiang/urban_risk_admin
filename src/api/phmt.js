import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addPhmtBase(params) {
    return fetchPost('/api/puhuomatou', params)
  },
  // 基本信息
  getPhmtBase(params) {
    return fetchGet(`/api/puhuomatou/${params}`)
  },
  // 普货码头-仓储信息保存
  addCcxxphInfo(params) {
    return fetchPost(`/api/puhuomatoucangchuxinxi`, params)
  },
  // 普货码头-仓储信息列表
  getCcxxphList(params) {
    return fetchGet('/api/puhuomatoucangchuxinxi', params)
  },
  // 普货码头-仓储信息删除
  deleteCcxxphInfo(id) {
    return fetchDelete(`/api/puhuomatoucangchuxinxi/${id}`)
  },
  // 普货码头-装卸设备保存
  addZxsbInfo(params) {
    return fetchPost(`/api/puhuomatouzhuangxieshebei`, params)
  },
  // 普货码头-装卸设备列表
  getZxsbList(params) {
    return fetchGet('/api/puhuomatouzhuangxieshebei', params)
  },
  // 普货码头-装卸设备删除
  deleteZxsbInfo(id) {
    return fetchDelete(`/api/puhuomatouzhuangxieshebei/${id}`)
  },
}
