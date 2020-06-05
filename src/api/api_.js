import { fetchPost, fetchGet } from './axios_'

export default {

  // 行业分类
  getTradeList(params) {
    return fetchGet('/api/industry_category', params)
  },

  // 站点信息
  getSite(params) {
    return fetchGet('/api/site_config', params)
  },

  // 地铁
  getStation(params) {
    return fetchGet('/api/metro', params)
  },

  // 危险化学品
  getWhqy(params) {
    return fetchGet('/api/whqy', params)
  },

  // 三场所三企业
  getScssqy(params) {
    return fetchGet('/api/scssqy', params)
  },
}
