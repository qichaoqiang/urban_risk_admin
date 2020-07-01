import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCssdBase(params) {
    return fetchPost('/api/chengshisuidao', params)
  },
  // 基本信息
  getCssdBase(params) {
    return fetchGet(`/api/chengshisuidao/${params}`)
  },
}
