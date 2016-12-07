import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Auth, Data, Error } from '../container'

import configure from './configure'
import saga from './saga'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root-redux-saga')
  const { store, sagaMiddleware } = configure()
  sagaMiddleware.run(saga)

  function doRender () {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Error doReset={() => store.dispatch({ type: 'error:reset' })}/>
          <Auth
            doAuth={({ name, password }) => store.dispatch({ type: 'saga:auth:fetch', payload: { name, password } })}
            doReset={() => store.dispatch({ type: 'auth:reset' })}
          />
          <Data
            doFetch={(token) => store.dispatch({ type: 'saga:data:fetch', payload: { token } })}
            doReset={() => store.dispatch({ type: 'data:reset' })}
          />
        </div>
      </Provider>,
      rootElement
    )
  }

  doRender()

  window[ 'redux-saga' ] = { doRender, rootElement, store }
})
