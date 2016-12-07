import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducer'

export default function configure () {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  )
  return {
    store,
    sagaMiddleware
  }
}
