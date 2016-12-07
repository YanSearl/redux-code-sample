import fetchJson from '../../fetchJson'

// immutable session sample

const initialState = {
  isPending: false,
  token: null
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'auth:pending':
      return { isPending: true, token: state.token }
    case 'auth:set':
      return { isPending: false, token: payload.token }
    case 'auth:reset':
      return initialState
  }
  return state
}

const service = function * ({ req, res, store }) {
  while (true) {
    const { type, payload } = yield req('service:auth:do-auth')
    operationMap[ type ](store, payload)
  }
}

const operationMap = {
  'service:auth:do-auth': ({ dispatch }, payload) => {
    dispatch({ type: 'auth:pending' })
    return fetchJson('/auth', payload)
      .then((result) => {
        dispatch({ type: 'auth:set', payload: { token: result.token } })
        dispatch({ type: 'entry:auth:ready', payload: result })
      })
      .catch((error) => { dispatch({ type: 'error:set', payload: { error: 'Auth Error' } }) })
  }
}

export default {
  name: 'auth',
  type: 'auth',
  session: initialState,
  service,
  reducer
}
