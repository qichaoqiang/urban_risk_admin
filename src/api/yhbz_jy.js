import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYhbzjyBase(params) {
    return fetchPost('/api/yanhuabaozhujingyingqiye', params)
  },
  // 基本信息
  getYhbzjyBase(params) {
    return fetchGet(`/api/yanhuabaozhujingyingqiye/${params}`)
  },
  // 经营烟花爆竹-产品保存
  addCpyhbzjyInfo(params) {
    return fetchPost(`/api/jingyingyanhuabaozhuchanpin`, params)
  },
  // 经营烟花爆竹-产品列表
  getCpyhbzjyList(params) {
    return fetchGet('/api/jingyingyanhuabaozhuchanpin', params)
  },
  // 经营烟花爆竹-产品删除
  deleteCpyhbzjyInfo(id) {
    return fetchDelete(`/api/jingyingyanhuabaozhuchanpin/${id}`)
  },
  // 烟花爆竹-仓库信息保存
  addCkyhbzInfo(params) {
    return fetchPost(`/api/yanhuabaozhucangkuxinxi`, params)
  },
  // 烟花爆竹-仓库信息列表
  getCkyhbzList(params) {
    return fetchGet('/api/yanhuabaozhucangkuxinxi', params)
  },
  // 烟花爆竹-仓库信息删除
  deleteCkyhbzInfo(id) {
    return fetchDelete(`/api/yanhuabaozhucangkuxinxi/${id}`)
  },
}
