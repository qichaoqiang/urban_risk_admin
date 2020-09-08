import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 防控报警器基本信息保存
  addFkbjqBase(params) {
    return fetchPost('/api/fangkongjingbaoqidianwei', params)
  },
  // 防控报警器
  getFkbjqBase(params) {
    return fetchGet(`/api/fangkongjingbaoqidianwei/${params}`)
  },
}
