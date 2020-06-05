import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addKsqywkkBase(params) {
    return fetchPost('/api/kuangshanqiyeweikuangku', params)
  },
  // 基本信息
  getKsqywkkBase(params) {
    return fetchGet(`/api/kuangshanqiyeweikuangku/${params}`)
  },
  // 尾矿库规模保存
  addWkkgmInfo(params) {
    return fetchPost(`/api/weikuangkuguimo`, params)
  },
  // 尾矿库规模列表
  getWkkgmList(params) {
    return fetchGet('/api/weikuangkuguimo', params)
  },
  // 尾矿库规模删除
  deleteWkkgmInfo(id) {
    return fetchDelete(`/api/weikuangkuguimo/${id}`)
  },
  // 下游情况保存
  addXyqkwkkInfo(params) {
    return fetchPost(`/api/weikuangkuxiayouqingkuang`, params)
  },
  // 下游情况列表
  getXyqkwkkList(params) {
    return fetchGet('/api/weikuangkuxiayouqingkuang', params)
  },
  // 下游情况删除
  deleteXyqkwkkInfo(id) {
    return fetchDelete(`/api/weikuangkuxiayouqingkuang/${id}`)
  },
}
