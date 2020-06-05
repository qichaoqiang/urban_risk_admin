import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 宗教基本信息保存
  addReligionBase(params) {
    return fetchPost('/api/zongjiao', params)
  },
  // 宗教
  getReligionBase(params) {
    return fetchGet(`/api/zongjiao/${params}`)
  },
}
