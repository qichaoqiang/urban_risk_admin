import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addDtyxBase(params) {
    return fetchPost('/api/ditieyunxing', params)
  },
  // 基本信息
  getDtyxBase(params) {
    return fetchGet(`/api/ditieyunxing/${params}`)
  },
  // 地铁运行站点信息保存
  addDtyxzdxxInfo(params) {
    return fetchPost(`/api/ditieyunxingzhandianxinxi`, params)
  },
  // 地铁运行站点信息列表
  getDtyxzdxxList(params) {
    return fetchGet('/api/ditieyunxingzhandianxinxi', params)
  },
  // 地铁运行站点信息删除
  deleteDtyxzdxxInfo(id) {
    return fetchDelete(`/api/ditieyunxingzhandianxinxi/${id}`)
  },
  // 地铁运行线路信息保存
  addDtyxxlxxInfo(params) {
    return fetchPost(`/api/ditieyunxingxianluxinxi`, params)
  },
  // 地铁运行线路信息列表
  getDtyxxlxxList(params) {
    return fetchGet('/api/ditieyunxingxianluxinxi', params)
  },
  // 地铁运行线路信息删除
  deleteDtyxxlxxInfo(id) {
    return fetchDelete(`/api/ditieyunxingxianluxinxi/${id}`)
  },
  // 地铁运行组织保存
  addDtyxzzInfo(params) {
    return fetchPost(`/api/ditieyunxingzuzhi`, params)
  },
  // 地铁运行组织列表
  getDtyxzzList(params) {
    return fetchGet('/api/ditieyunxingzuzhi', params)
  },
  // 地铁运行组织删除
  deleteDtyxzzInfo(id) {
    return fetchDelete(`/api/ditieyunxingzuzhi/${id}`)
  },
}
