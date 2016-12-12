import fetchJson from '../fetchJson'

function thunkAuthFetch (name, password) {
  return (dispatch) => {
    dispatch({ type: 'auth:pending' })
    return fetchJson('/auth', { name, password })
      .then((result) => { dispatch({ type: 'auth:set', payload: { token: result.token } }) })
  }
}
function thunkDataFetch (token) {
  return (dispatch) => {
    dispatch({ type: 'data:pending' })
    return fetchJson('/data', { token })
      .then((result) => { dispatch({ type: 'data:set', payload: { data: result } }) })
      .catch((error) => { dispatch({ type: 'error:set', payload: { error: 'Data Error' } }) })
  }
}
function thunkAuthDataFetch (name, password) {
  return (dispatch, getState) => {
    dispatch(thunkAuthFetch(name, password))
      .then(
        () => dispatch(thunkDataFetch(getState().auth.token)),
        (error) => dispatch({ type: 'error:set', payload: { error: 'Auth Error' } })
      )
  }
}

export {
  thunkDataFetch,
  thunkAuthDataFetch
}