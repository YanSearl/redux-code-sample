import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Auth, Data, Error } from '../container'

import configure from './configure'
import { thunkDataFetch, thunkAuthDataFetch } from './thunk'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root-redux-thunk')
  const { store } = configure()

  function doRender () {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Error doReset={() => store.dispatch({ type: 'error:reset' })}/>
          <Auth
            doAuth={({ name, password }) => store.dispatch(thunkAuthDataFetch(name, password))}
            doReset={() => store.dispatch({ type: 'auth:reset' })}
          />
          <Data
            doFetch={(token) => store.dispatch(thunkDataFetch(token))}
            doReset={() => store.dispatch({ type: 'data:reset' })}
          />
        </div>
      </Provider>,
      rootElement
    )
  }

  doRender()

  window[ 'redux-thunk' ] = { doRender, rootElement, store }
})
