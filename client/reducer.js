const initialState = {
  auth: { isPending: false, token: null },
  data: { isPending: false, data: null },
  error: null
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case 'auth:pending':
      return { ...state, auth: { isPending: true, token: state.auth.token } }
    case 'auth:set':
      return { ...state, auth: { isPending: false, token: payload.token } }
    case 'auth:reset':
      return { ...state, auth: { isPending: false, token: null } }
    case 'data:pending':
      return { ...state, data: { isPending: true, data: state.data.data } }
    case 'data:set':
      return { ...state, data: { isPending: false, data: payload.data } }
    case 'data:reset':
      return { ...state, data: { isPending: false, data: null } }
    case 'error:set':
      return { ...state, error: payload.error }
    case 'error:reset':
      return initialState
  }
  return state
}