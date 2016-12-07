import { createSessionReducer } from 'redux-service'

import Auth from './Auth'
import Data from './Data'
import Error from './Error'

const reformList = [
  Auth,
  Data,
  Error
]

const serviceMap = {}
const reducerMap = {}

reformList.forEach(({ name, type, service, session, reducer }) => {
  if (service) serviceMap[ name ] = service
  reducerMap[ name ] = reducer || createSessionReducer(`reducer:${type}:update`, session)
})

export {
  serviceMap,
  reducerMap
}

