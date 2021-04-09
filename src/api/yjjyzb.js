import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYjjyzbBase(params) {
    return fetchPost('/api/yingjijiuyuanzhuangbei', params)
  },
  
  // 基本信息
  getYjjyzbBase(params) {
    return fetchGet(`/api/yingjijiuyuanzhuangbei/${params}`)
  },
}
