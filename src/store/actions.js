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
  save_levelList(context, levelList) {
    return new Promise((resolve) => {
      context.commit('update_levelList', levelList)
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
  },
  save_fxylb(context, fxylb) {
    return new Promise((resolve) => {
      context.commit('update_fxylb', fxylb)
      resolve()
    })
  },
  save_fxySum(context, fxySum) {
    return new Promise((resolve) => {
      context.commit('update_fxySum', fxySum)
      resolve()
    })
  },
  save_riskPoints(context, riskPoints) {
    return new Promise((resolve) => {
      context.commit('update_riskPoints', riskPoints)
      resolve()
    })
  },
  save_industry(context, industry) {
    return new Promise((resolve) => {
      context.commit('update_industry', industry)
      resolve()
    })
  }
}

export default actions
