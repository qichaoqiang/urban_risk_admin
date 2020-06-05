import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addSazlBase(params) {
    return fetchPost('/api/sheanzhilengqiye', params)
  },
  // 基本信息
  getSazlBase(params) {
    return fetchGet(`/api/sheanzhilengqiye/${params}`)
  },
  // 液氨制冷系统保存
  addYdzlxtInfo(params) {
    return fetchPost(`/api/yeanzhilengxitong`, params)
  },
  // 液氨制冷系统列表
  getYdzlxtList(params) {
    return fetchGet('/api/yeanzhilengxitong', params)
  },
  // 液氨制冷系统删除
  deleteYdzlxtInfo(id) {
    return fetchDelete(`/api/yeanzhilengxitong/${id}`)
  },
}
