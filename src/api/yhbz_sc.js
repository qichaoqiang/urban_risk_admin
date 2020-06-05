import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYhbzscBase(params) {
    return fetchPost('/api/yanhuabaozhushengchanqiye', params)
  },
  // 基本信息
  getYhbzscBase(params) {
    return fetchGet(`/api/yanhuabaozhushengchanqiye/${params}`)
  },
  // 生产烟花爆竹-产品保存
  addCpyhbzscInfo(params) {
    return fetchPost(`/api/shengchanyanhuabaozhuchanpin`, params)
  },
  // 生产烟花爆竹-产品列表
  getCpyhbzscList(params) {
    return fetchGet('/api/shengchanyanhuabaozhuchanpin', params)
  },
  // 生产烟花爆竹-产品删除
  deleteCpyhbzscInfo(id) {
    return fetchDelete(`/api/shengchanyanhuabaozhuchanpin/${id}`)
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
