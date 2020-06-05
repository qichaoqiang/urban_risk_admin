import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addJzsgBase(params) {
    return fetchPost('/api/jianzhushigong', params)
  },
  // 基本信息
  getJzsgBase(params) {
    return fetchGet(`/api/jianzhushigong/${params}`)
  },
  // 危险性较大工程保存
  addWxxjdInfo(params) {
    return fetchPost(`/api/weixianxingjiaodagongcheng`, params)
  },
  // 危险性较大工程列表
  getWxxjdList(params) {
    return fetchGet('/api/weixianxingjiaodagongcheng', params)
  },
  // 危险性较大工程删除
  deleteWxxjdInfo(id) {
    return fetchDelete(`/api/weixianxingjiaodagongcheng/${id}`)
  },
  // 一定规模工程保存
  addYdgmInfo(params) {
    return fetchPost(`/api/yidingguimogongcheng`, params)
  },
  // 一定规模工程列表
  getYdgmList(params) {
    return fetchGet('/api/yidingguimogongcheng', params)
  },
  // 一定规模工程删除
  deleteYdgmInfo(id) {
    return fetchDelete(`/api/yidingguimogongcheng/${id}`)
  },
}
