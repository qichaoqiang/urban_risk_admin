import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addXjjdBase(params) {
    return fetchPost('/api/xingjijiudian', params)
  },
  // 基本信息
  getXjjdBase(params) {
    return fetchGet(`/api/xingjijiudian/${params}`)
  },
}
