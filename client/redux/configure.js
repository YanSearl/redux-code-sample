import { createStore } from 'redux'
import reducer from '../reducer'

export default function configure () {
  const store = createStore(reducer)
  return {
    store
  }
}
