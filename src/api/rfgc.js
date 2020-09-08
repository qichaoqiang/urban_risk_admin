import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addRfgcBase(params) {
    return fetchPost('/api/renfanggongchengdianwei', params)
  },
  // 基本信息
  getRfgcBase(params) {
    return fetchGet(`/api/renfanggongchengdianwei/${params}`)
  },
  // // 营业状况保存
  // addYyzkInfo(params) {
  //   return fetchPost(`/api/jiudianyingyezhuangkuang`, params)
  // },
  // // 营业状况列表
  // getYyzkList(params) {
  //   return fetchGet('/api/jiudianyingyezhuangkuang', params)
  // },
  // // 营业状况删除
  // deleteYyzkInfo(id) {
  //   return fetchDelete(`/api/jiudianyingyezhuangkuang/${id}`)
  // },
}
