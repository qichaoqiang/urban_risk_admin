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
import whylcs from './whylcs' // 文化娱乐场所
import wb from './wb' // 网吧
import bgjd from './bgjd' // 宾馆酒店
import xjjd from './xjjd' // 星级酒店
import gczz from './gczz' // 高层住宅
import gcggjz from './gcggjz' // 高层公共建筑
import tycg from './tycg' // 体育场馆
import wxhwys from './wxhwys' // 危险货物运输
import whmt from './whmt' // 危货码头
import phmt from './phmt' // 普货码头
import kymt from './kymt' // 客运码头
import csql from './csql' // 城市桥梁
import cssd from './cssd' // 城市隧道
import ztxnc from './ztxnc' // 渣土消纳场
import skdb from './skdb' // 水库大坝
import lybc from './lybc' // 旅游包车
import czrq from './czrq' // 城镇燃气
import csgxsq from './csgxsq' // 长输管线（输气）
import csgxsy from './csgxsy' // 长输管线（输油）
import rfgc from './rfgc' // 人防工程
import fkbjq from './fkbjq' // 防空报警器
import zyjjmb from './zyjjmb' // 重要经济目标
import ssjd from './ssjd' // 重要经济目标
import dt from './dt' // 重要经济目标


export default {
  // 登录
  oauthToken(params) {
    return fetchPost('/oauth/token', params)
  },
  // 用户信息
  getUserInfo(params) {
    return fetchGet('/api/dangqianyonghu', params)
  },
  // 修改用户信息
  changeUserInfo(params) {
    return fetchPost('/api/dangqianyonghu', params)
  },
  // 行业分类
  getIndustryList(params) {
    return fetchGet('/api/hangyemenlei', params)
  },
  // 施工项目类型
  getXmsslxList(params) {
    return fetchGet('/api/shigongxiangmuleixing', params)
  },
  // 区域风险
  getQyfxList(params) {
    return fetchGet('/api/quyufengxian', params)
  },
  // 区域行业风险
  getAreaIndustryList(params) {
    return fetchGet('/api/quyuhangyefengxian', params)
  },
  // 区域风险源数量
  getQyfxySlList(params) {
    return fetchGet('/api/fengxianyuangaikuang', params)
  },
  // 风险信息
  getFxxxList(params) {
    return fetchGet('/api/fengxianxinxi', params)
  },
  // 风险分级
  fxfj(params) {
    return fetchPost('/api/fengxianfenji', params)
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
  ...bgjd,
  ...xjjd,
  ...gczz,
  ...gcggjz,
  ...tycg,
  ...wxhwys,
  ...whmt,
  ...phmt,
  ...kymt,
  ...csql,
  ...cssd,
  ...ztxnc,
  ...skdb,
  ...lybc,
  ...czrq,
  ...csgxsq,
  ...csgxsy,
  ...rfgc,
  ...fkbjq,
  ...zyjjmb,
  ...ssjd,
  ...dt
}
