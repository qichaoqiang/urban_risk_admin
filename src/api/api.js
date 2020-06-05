import { fetchPost, fetchGet } from './axios'

import role from './role' // 角色管理
import cj_account from './cj_account' // 采集账号管理
import admin from './admin' // 管理员账号管理
import project from './project' // 项目管理
import quyu from './quyu' // 区域管理
import sbfc from './sbfc' // 涉爆粉尘
import ctky from './ctky' // 长途客运
import travel from './travel' // 旅游场所
import school from './school' // 学校
import religion from './religion' // 宗教
import hospital from './hospital' // 医院
import nurs from './nurs' // 养老院
import mbqy from './mbqy' // 民爆企业
import wxhxp_sc from './wxhxp_sc' // 危险化学品生产企业
import wxhxp_cc from './wxhxp_cc' // 危险化学品储存企业
import wxhxp_sy from './wxhxp_sy' // 危险化学品使用企业
import yhbz_sc from './yhbz_sc' // 烟花爆竹生产
import yhbz_jy from './yhbz_jy' // 烟花爆竹经营
import ksqy_dxk from './ksqy_dxk' // 矿山企业地下矿
import ksqy_ltk from './ksqy_ltk' // 矿山企业露天矿
import ksqy_wkk from './ksqy_wkk' // 矿山企业尾库矿
import sptqy from './sptqy' // 涉喷涂企业
import sazl from './sazl' // 涉案制冷
import cbxz from './cbxz' // 船舶修造
import jsyl from './jsyl' // 金属冶炼
import jyz from './jyz' // 加油站
import yhsyqcz from './yhsyqcz' // 加油站
import trqcz from './trqcz' // 天然气场站
import jzsg from './jzsg' // 天然气场站
import cycs from './cycs' // 餐饮场所
import zysc from './zysc' // 专业市场
import smzht from './smzht' // 商贸综合体
import whylcs from './whylcs' // 餐饮场所
import wb from './wb' // 专业市场
import bgjd from './bgjd' // 商贸综合体

export default {
  // 登录
  oauthToken(params) {
    return fetchPost('/oauth/token', params)
  },
  // 用户信息
  getUserInfo(params) {
    return fetchGet('/api/dangqianyonghu', params)
  },
  // 行业分类
  getIndustryList(params) {
    return fetchGet('/api/hangyemenlei', params)
  },
  // 施工项目类型
  getXmsslxList(params) {
    return fetchGet('/api/shigongxiangmuleixing', params)
  },
  ...role,
  ...cj_account,
  ...admin,
  ...project,
  ...quyu,
  ...sbfc,
  ...ctky,
  ...travel,
  ...school,
  ...religion,
  ...hospital,
  ...nurs,
  ...mbqy,
  ...wxhxp_sc,
  ...wxhxp_cc,
  ...wxhxp_sy,
  ...yhbz_sc,
  ...yhbz_jy,
  ...ksqy_dxk,
  ...ksqy_ltk,
  ...ksqy_wkk,
  ...sptqy,
  ...sazl,
  ...cbxz,
  ...jsyl,
  ...jyz,
  ...yhsyqcz,
  ...trqcz,
  ...jzsg,
  ...cycs,
  ...zysc,
  ...smzht,
  ...whylcs,
  ...wb,
  ...bgjd
}
