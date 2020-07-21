let mutations = {
  update_tradeList(state, tradeList) {
    state.tradeList = tradeList
  },
  update_selectIds(state, selectIds) {
    state.selectIds = selectIds
  },
  update_levelIds(state, levelIds) {
    state.levelIds = levelIds
  }, 
  update_levelList(state, levelList) {
    state.levelList = levelList
  }, 
  update_resizeCount(state, resizeCount) {
    state.resizeCount = resizeCount
  },
  update_hasMenu(state, hasMenu) {
    state.hasMenu = hasMenu
  },
  update_fxylb(state, fxylb) {
    state.fxylb = fxylb
  },
  update_fxySum(state, fxySum) {
    state.fxySum = fxySum
  },
  update_riskPoints(state, riskPoints) {
    state.riskPoints = riskPoints
  },
  update_industry(state, industry) {
    state.industry = industry
  },
}

export default mutations
