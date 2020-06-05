import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWxhxpScBase(params) {
    return fetchPost('/api/weixianhuaxuepinshengchanqiye', params)
  },
  // 基本信息
  getWxhxpScBase(params) {
    return fetchGet(`/api/weixianhuaxuepinshengchanqiye/${params}`)
  },
  // 危险化学品保存
  addWhscInfo(params) {
    return fetchPost(`/api/weixianhuaxuepinshiyongqiye`, params)
  },
  // 危险化学品列表
  getWhscList(params) {
    return fetchGet('/api/weixianhuaxuepinshiyongqiye', params)
  },
  // 危险化学品删除
  deleteWhscInfo(id) {
    return fetchDelete(`/api/weixianhuaxuepinshiyongqiye/${id}`)
  },
  // 危化品重大危险源保存
  addWhRiskInfo(params) {
    return fetchPost(`/api/zhongdaweixianyuan`, params)
  },
  // 危化品重大危险源列表
  getWhRiskList(params) {
    return fetchGet('/api/zhongdaweixianyuan', params)
  },
  // 危化品重大危险源删除
  deleteWhRiskInfo(id) {
    return fetchDelete(`/api/zhongdaweixianyuan/${id}`)
  },
  // 生产装置保存
  addSczzInfo(params) {
    return fetchPost(`/api/shengchanzhuangzhi`, params)
  },
  // 生产装置列表
  getSczzList(params) {
    return fetchGet('/api/shengchanzhuangzhi', params)
  },
  // 生产装置删除
  deleteSczzInfo(id) {
    return fetchDelete(`/api/shengchanzhuangzhi/${id}`)
  },
  // 储存设施保存
  addCcssInfo(params) {
    return fetchPost(`/api/weixianhuaxuepinchucunsheshi`, params)
  },
  // 储存设施列表
  getCcssList(params) {
    return fetchGet('/api/weixianhuaxuepinchucunsheshi', params)
  },
  // 储存设施删除
  deleteCcssInfo(id) {
    return fetchDelete(`/api/weixianhuaxuepinchucunsheshi/${id}`)
  },
  // 罐区保存
  addGqscInfo(params) {
    return fetchPost(`/api/guanquxinxi`, params)
  },
  // 罐区列表
  getGqscList(params) {
    return fetchGet('/api/guanquxinxi', params)
  },
  // 罐区删除
  deleteGqscInfo(id) {
    return fetchDelete(`/api/guanquxinxi/${id}`)
  },
  // 周边情况保存
  addRimInfo(params) {
    return fetchPost(`/api/zhoubianhuanjing`, params)
  },
  // 周边情况列表
  getRimList(params) {
    return fetchGet('/api/zhoubianhuanjing', params)
  },
  // 周边情况删除
  deleteRimInfo(id) {
    return fetchDelete(`/api/zhoubianhuanjing/${id}`)
  },
}
