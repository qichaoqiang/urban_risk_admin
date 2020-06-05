import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 涉爆粉尘保存
  addSbfcBase(params) {
    return fetchPost('/api/shebaofenchenqiye', params)
  },
  // 涉爆粉尘
  getSbfcBase(params) {
    return fetchGet(`/api/shebaofenchenqiye/${params}`)
  },
  // 危险化学品保存
  addWhsbfcInfo(params) {
    return fetchPost(`/api/weixianhuaxuepin`, params)
  },
  // 危险化学品列表
  getWhsbfcList(params) {
    return fetchGet('/api/weixianhuaxuepin', params)
  },
  // 危险化学品删除
  deleteWhsbfcInfo(id) {
    return fetchDelete(`/api/weixianhuaxuepin/${id}`)
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
  // 涉爆粉尘工艺保存
  addSbfcgyInfo(params) {
    return fetchPost(`/api/shebaofenchengongyi`, params)
  },
  // 涉爆粉尘工艺列表
  getSbfcgyList(params) {
    return fetchGet('/api/shebaofenchengongyi', params)
  },
  // 涉爆粉尘工艺删除
  deleteSbfcgyInfo(id) {
    return fetchDelete(`/api/shebaofenchengongyi/${id}`)
  },
  // 涉爆粉尘工艺列表
  getFclxList(params) {
    return fetchGet('api/fenchenleixing', params)
  },
  // 重点监管危险工艺保存
  addMainRiskInfo(params) {
    return fetchPost(`/api/zhongdianjianguanweixiangongyi`, params)
  },
  // 重点监管危险工艺列表
  getMainRiskList(params) {
    return fetchGet('/api/zhongdianjianguanweixiangongyi', params)
  },
  // 重点监管危险工艺删除
  deleteMainRiskInfo(id) {
    return fetchDelete(`/api/zhongdianjianguanweixiangongyi/${id}`)
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
  // 除尘设备保存
  addDevicesbfcInfo(params) {
    return fetchPost(`/api/chuchensheshi`, params)
  },
  // 除尘设备列表
  getDevicesbfcList(params) {
    return fetchGet('/api/chuchensheshi', params)
  },
  // 除尘设备删除
  deleteDevicesbfcInfo(id) {
    return fetchDelete(`/api/chuchensheshi/${id}`)
  },
}
