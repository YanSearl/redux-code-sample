// reducer only
const initialState = null

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'error:set':
      return payload.error
    case 'error:reset':
      return initialState
  }
  return state
}

export default {
  name: 'error',
  type: 'error',
  reducer
}
