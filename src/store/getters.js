let getters = {
  getTradeList: state => {
    return state.tradeList
  },
  getSelectIds: state => {
    return state.getSelectIds
  },
  getLevelIds: state => {
    return state.levelIds
  },
  getResizeCounr: state => {
    return state.resizeCount
  },
  getHasMenu: state => {
    return state.hasMenu
  },
  getFxylb: state => {
    return state.fxylb
  },
  getFxySum: state => {
    return state.fxySum
  }
}

export default getters
