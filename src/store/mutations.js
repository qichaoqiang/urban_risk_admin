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
  update_resizeCount(state, resizeCount) {
    state.resizeCount = resizeCount
  },
  update_hasMenu(state, hasMenu) {
    state.hasMenu = hasMenu
  },
}

export default mutations
