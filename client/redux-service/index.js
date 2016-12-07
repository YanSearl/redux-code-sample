import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Auth, Data, Error } from '../container'

import configure from './configure'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root-redux-service')
  const { store } = configure()

  function doRender () {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Error doReset={() => store.dispatch({ type: 'entry:reset' })}/>
          <Auth
            doAuth={({ name, password }) => store.dispatch({ type: 'service:auth:do-auth', payload: { name, password } })}
            doReset={() => store.dispatch({ type: 'auth:reset' })}
          />
          <Data
            doFetch={(token) => store.dispatch({ type: 'service:data:do-fetch', payload: { token } })}
            doReset={() => store.dispatch({ type: 'service:data:reset' })}
          />
        </div>
      </Provider>,
      rootElement
    )
  }

  doRender()

  window[ 'redux-service' ] = { doRender, rootElement, store }
})
