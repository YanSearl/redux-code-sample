import fetchJson from '../../fetchJson'

// mutable session sample

const session = {
  isPending: false,
  data: null
}

const service = function * ({ req, res, store }) {
  while (true) {
    yield res({ type: 'reducer:data:update', payload: session })
    const { type, payload } = yield req([
      'service:data:do-fetch',
      'service:data:reset'
    ])
    operationMap[ type ](session, store, payload)
  }
}

const operationMap = {
  'service:data:do-fetch': (session, { dispatch }, payload) => {
    session.isPending = true
    dispatch({ type: 'reducer:data:update', payload: session })
    return fetchJson('/data', payload)
      .then((result) => {
        session.isPending = false
        session.data = result
        dispatch({ type: 'reducer:data:update', payload: session })
      })
      .catch((error) => {
        dispatch({ type: 'error:set', payload: { error: 'Data Error' } })
      })
  },
  'service:data:reset': (session, store, payload) => {
    session.isPending = false
    session.data = null
  }
}

export default {
  name: 'data',
  type: 'data',
  session,
  service
}
