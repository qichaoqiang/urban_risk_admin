import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addDwylddBase(params) {
    return fetchPost('/api/diwayilaodidai', params)
  },
  // 基本信息
  getDwylddBase(params) {
    return fetchGet(`/api/diwayilaodidai/${params}`)
  },
}
