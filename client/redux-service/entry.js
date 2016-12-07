export const entryMap = {
  // bundled actions
  'entry:reset': ({ dispatch }, action) => {
    dispatch({ type: 'auth:reset' })
    dispatch({ type: 'service:data:reset' })
    dispatch({ type: 'error:reset' })
  },

  // chain action
  'entry:auth:ready': ({ dispatch }, { payload }) => {
    dispatch({ type: 'service:data:do-fetch', payload })
  }
}
