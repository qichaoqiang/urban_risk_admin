import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addGczzBase(params) {
    return fetchPost('/api/gaocengzhuzhai', params)
  },
  // 基本信息
  getGczzBase(params) {
    return fetchGet(`/api/gaocengzhuzhai/${params}`)
  },
}
