import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addBgjdBase(params) {
    return fetchPost('/api/binguanjiudian', params)
  },
  // 基本信息
  getBgjdBase(params) {
    return fetchGet(`/api/binguanjiudian/${params}`)
  },
  // 建筑物保存
  addJzwBase(params) {
    return fetchPost('/api/jianzhuwuxinxi', params)
  },
  // 建筑物信息
  getJzwBase(params) {
    return fetchGet(`/api/jianzhuwuxinxi/${params}`)
  },
  // 营业状况保存
  addYyzkInfo(params) {
    return fetchPost(`/api/jiudianyingyezhuangkuang`, params)
  },
  // 营业状况列表
  getYyzkList(params) {
    return fetchGet('/api/jiudianyingyezhuangkuang', params)
  },
  // 营业状况删除
  deleteYyzkInfo(id) {
    return fetchDelete(`/api/jiudianyingyezhuangkuang/${id}`)
  },
}
