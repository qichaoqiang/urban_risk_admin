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
  addClInfo(params) {
    return fetchPost(`/api/cheliangxinxi`, params)
  },
  // 车辆信息列表
  getClList(params) {
    return fetchGet('/api/cheliangxinxi', params)
  },
  // 车辆信息删除
  deleteClInfo(id) {
    return fetchDelete(`/api/cheliangxinxi/${id}`)
  },
  // 线路信息保存
  addXlInfo(params) {
    return fetchPost(`/api/xianluxinxi`, params)
  },
  // 线路信息列表
  getXlList(params) {
    return fetchGet('/api/xianluxinxi', params)
  },
  // 线路信息删除
  deleteXlInfo(id) {
    return fetchDelete(`/api/xianluxinxi/${id}`)
  },
  // 运营情况保存
  addYyInfo(params) {
    return fetchPost(`/api/yunyingzhuangkuang`, params)
  },
  // 运营情况列表
  getYyList(params) {
    return fetchGet('/api/yunyingzhuangkuang', params)
  },
  // 运营情况删除
  deleteYyInfo(id) {
    return fetchDelete(`/api/yunyingzhuangkuang/${id}`)
  },
}
