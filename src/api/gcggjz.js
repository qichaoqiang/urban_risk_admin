import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addGcggjzBase(params) {
    return fetchPost('/api/gaocenggonggongjianzhu', params)
  },
  // 基本信息
  getGcggjzBase(params) {
    return fetchGet(`/api/gaocenggonggongjianzhu/${params}`)
  },
}
