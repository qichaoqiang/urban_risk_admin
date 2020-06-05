let actions = {
  save_tradeList(context, tradeList) {
    return new Promise((resolve) => {
      context.commit('update_tradeList', tradeList)
      resolve()
    })
  },
  save_selectIds(context, selectIds) {
    return new Promise((resolve) => {
      context.commit('update_selectIds', selectIds)
      resolve()
    })
  },
  save_levelIds(context, levelIds) {
    return new Promise((resolve) => {
      context.commit('update_levelIds', levelIds)
      resolve()
    })
  }, 
  save_resizeCount(context, resizeCount) {
    return new Promise((resolve) => {
      context.commit('update_resizeCount', resizeCount)
      resolve()
    })
  }, 
  save_hasMenu(context, hasMenu) {
    return new Promise((resolve) => {
      context.commit('update_hasMenu', hasMenu)
      resolve()
    })
  }
}

export default actions
