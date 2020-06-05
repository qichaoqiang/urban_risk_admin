import { fetchPost, fetchGet, fetchDelete, fetchPostFile } from './axios'

export default {
  // 项目保存
  addProjectItem(params) {
    return fetchPost('/api/xiangmu', params)
  },
  // 项目列表
  getProjectList(params) {
    return fetchGet('/api/xiangmu', params)
  },
  // 项目删除
  deleteProjectItem(id) {
    return fetchDelete(`/api/xiangmu/${id}`)
  },
  // 风险源保存
  addFxyItem(params) {
    return fetchPost('/api/fengxianyuan', params)
  },
  // 风险源导入
  importFxyItem(params) {
    return fetchPostFile('/api/fengxianyuan', params)
  },
  // 风险源列表
  getFxyList(params) {
    return fetchGet('/api/fengxianyuan', params)
  },
  // 风险源列表
  exportFxyList(params) {
    return fetchGet('/api/fengxianyuan', params)
  },
  // 风险源删除
  deleteFxyItem(id) {
    return fetchDelete(`/api/fengxianyuan/${id}`)
  },
  // 风险源类别保存
  addFxylbItem(params) {
    return fetchPost('/api/fengxianyuanleibie', params)
  },
  // 风险源类别列表
  getFxylbList(params) {
    return fetchGet('/api/fengxianyuanleibie', params)
  },
  // 风险源类别删除
  deleteFxylbItem(id) {
    return fetchDelete(`/api/fengxianyuanleibie/${id}`)
  },
}
