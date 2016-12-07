import { createStore, applyMiddleware, combineReducers } from 'redux'
import { ReduxService } from 'redux-service'
import { serviceMap, reducerMap } from './service'
import { entryMap } from './entry'

export default function configure () {
  const reduxService = new ReduxService()
  const store = createStore(
    combineReducers(reducerMap),
    applyMiddleware(reduxService.middleware)
  )
  for (const key in entryMap) reduxService.setEntry(key, entryMap[ key ])
  for (const key in serviceMap) reduxService.setService(key, serviceMap[ key ])
  reduxService.startAllService()
  return {
    store,
    reduxService
  }
}
