import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWxhwysBase(params) {
    return fetchPost('/api/weixianhuowuyunshu', params)
  },
  // 基本信息
  getWxhwysBase(params) {
    return fetchGet(`/api/weixianhuowuyunshu/${params}`)
  },
  //人员信息保存
  addRyxxInfo(params) {
    return fetchPost(`/api/yunshurenyuanxinxi`, params)
  },
  //人员信息列表
  getRyxxList(params) {
    return fetchGet('/api/yunshurenyuanxinxi', params)
  },
  //人员信息删除
  deleteRyxxInfo(id) {
    return fetchDelete(`/api/yunshurenyuanxinxi/${id}`)
  },
  // 车辆信息保存
  addClxxInfo(params) {
    return fetchPost(`/api/yunshucheliangxinxi`, params)
  },
  // 车辆信息列表
  getClxxList(params) {
    return fetchGet('/api/yunshucheliangxinxi', params)
  },
  // 车辆信息删除
  deleteClxxInfo(id) {
    return fetchDelete(`/api/yunshucheliangxinxi/${id}`)
  },
  // 运输信息保存
  addYsxxInfo(params) {
    return fetchPost(`/api/yunshuliangxinxi`, params)
  },
  // 运输信息列表
  getYsxxList(params) {
    return fetchGet('/api/yunshuliangxinxi', params)
  },
  // 运输信息删除
  deleteYsxxInfo(id) {
    return fetchDelete(`/api/yunshuliangxinxi/${id}`)
  },
}
