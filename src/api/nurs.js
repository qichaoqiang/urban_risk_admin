import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addNursBase(params) {
    return fetchPost('/api/yanglaoyuanshehuifuli', params)
  },
  // 基本信息
  getNursBase(params) {
    return fetchGet(`/api/yanglaoyuanshehuifuli/${params}`)
  },
  // 工作列表保存
  addGzfhItem(params) {
    return fetchPost('/api/yanglaoyuangongzuofuhe', params)
  },
  // 工作列表列表
  getGzfhItemList(params) {
    return fetchGet('/api/yanglaoyuangongzuofuhe', params)
  },
  // 工作列表删除
  deleteGzfhItem(id) {
    return fetchDelete(`/api/yanglaoyuangongzuofuhe/${id}`)
  },
  // 收住对象保存
  addSzdxItem(params) {
    return fetchPost('/api/yanglaoyuanshouzhuduixiang', params)
  },
  // 收住对象列表
  getSzdxItemList(params) {
    return fetchGet('/api/yanglaoyuanshouzhuduixiang', params)
  },
  // 收住对象删除
  deleteSzdxItem(id) {
    return fetchDelete(`/api/yanglaoyuanshouzhuduixiang/${id}`)
  },
}
