import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addTrqczBase(params) {
    return fetchPost('/api/tianranqichangzhan', params)
  },
  // 基本信息
  getTrqczBase(params) {
    return fetchGet(`/api/tianranqichangzhan/${params}`)
  },
  // 储配站保存
  addCpzInfo(params) {
    return fetchPost(`/api/chucunxinxichupeizhan`, params)
  },
  // 储配站列表
  getCpzList(params) {
    return fetchGet('/api/chucunxinxichupeizhan', params)
  },
  // 储配站删除
  deleteCpzInfo(id) {
    return fetchDelete(`/api/chucunxinxichupeizhan/${id}`)
  },
  // 加气站、门站保存
  addJqzInfo(params) {
    return fetchPost(`/api/chucunxinxijiaqizhan`, params)
  },
  // 加气站、门站列表
  getJqzList(params) {
    return fetchGet('/api/chucunxinxijiaqizhan', params)
  },
  // 加气站、门站删除
  deleteJqzInfo(id) {
    return fetchDelete(`/api/chucunxinxijiaqizhan/${id}`)
  },
  // 经营状况保存
  addJyzkInfo(params) {
    return fetchPost(`/api/yehuashiyouqijingyingzhuangkuang`, params)
  },
  // 经营状况列表
  getJyzkList(params) {
    return fetchGet('/api/yehuashiyouqijingyingzhuangkuang', params)
  },
  // 经营状况删除
  deleteJyzkInfo(id) {
    return fetchDelete(`/api/yehuashiyouqijingyingzhuangkuang/${id}`)
  },
}
