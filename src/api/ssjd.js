import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addSsjdBase(params) {
    return fetchPost('/api/shusanjidi', params)
  },
  // 基本信息
  getSsjdBase(params) {
    return fetchGet(`/api/shusanjidi/${params}`)
  },
  // 视频信号保存
  addSpxhInfo(params) {
    return fetchPost(`/api/shipinxinhaodizhi`, params)
  },
  // 视频信号列表
  getSpxhList(params) {
    return fetchGet('/api/shipinxinhaodizhi', params)
  },
  // 视频信号删除
  deleteSpxhInfo(id) {
    return fetchDelete(`/api/shipinxinhaodizhi/${id}`)
  },
}
