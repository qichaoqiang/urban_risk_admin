import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYhsyqczBase(params) {
    return fetchPost('/api/yehuashiyouqichangzhan', params)
  },
  // 基本信息
  getYhsyqczBase(params) {
    return fetchGet(`/api/yehuashiyouqichangzhan/${params}`)
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
  // 供应站保存
  addGyzInfo(params) {
    return fetchPost(`/api/chucunxinxigongyingzhan`, params)
  },
  // 供应站列表
  getGyzList(params) {
    return fetchGet('/api/chucunxinxigongyingzhan', params)
  },
  // 供应站删除
  deleteGyzInfo(id) {
    return fetchDelete(`/api/chucunxinxigongyingzhan/${id}`)
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
