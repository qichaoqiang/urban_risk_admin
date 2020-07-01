import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 长途客运基本信息保存
  addCtkyBase(params) {
    return fetchPost('/api/changtukeyun', params)
  },
  // 长途客运
  getCtkyBase(params) {
    return fetchGet(`/api/changtukeyun/${params}`)
  },
  // 车辆信息保存
  addClxxctInfo(params) {
    return fetchPost(`/api/cheliangxinxi`, params)
  },
  // 车辆信息列表
  getClxxctList(params) {
    return fetchGet('/api/cheliangxinxi', params)
  },
  // 车辆信息删除
  deleteClxxctInfo(id) {
    return fetchDelete(`/api/cheliangxinxi/${id}`)
  },
  // 线路信息保存
  addXlxxInfo(params) {
    return fetchPost(`/api/xianluxinxi`, params)
  },
  // 线路信息列表
  getXlxxList(params) {
    return fetchGet('/api/xianluxinxi', params)
  },
  // 线路信息删除
  deleteXlxxInfo(id) {
    return fetchDelete(`/api/xianluxinxi/${id}`)
  },
  // 运营情况保存
  addYyqkInfo(params) {
    return fetchPost(`/api/yunyingzhuangkuang`, params)
  },
  // 运营情况列表
  getYyqkList(params) {
    return fetchGet('/api/yunyingzhuangkuang', params)
  },
  // 运营情况删除
  deleteYyqkInfo(id) {
    return fetchDelete(`/api/yunyingzhuangkuang/${id}`)
  },
}
