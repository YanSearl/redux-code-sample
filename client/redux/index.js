import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import fetchJson from '../fetchJson'
import { Auth, Data, Error } from '../container'

import configure from './configure'

function doAuthFetch (dispatch, name, password) {
  dispatch({ type: 'auth:pending' })
  return fetchJson('/auth', { name, password })
    .then((result) => { dispatch({ type: 'auth:set', payload: { token: result.token } }) })
    .catch((error) => {
      dispatch({ type: 'error:set', payload: { error: 'Auth Error' } })
      return error
    })
}

function doDataFetch (dispatch, token) {
  dispatch({ type: 'data:pending' })
  return fetchJson('/data', { token })
    .then((result) => { dispatch({ type: 'data:set', payload: { data: JSON.stringify(result) } }) })
    .catch((error) => {
      dispatch({ type: 'error:set', payload: { error: 'Data Error' } })
      return error
    })
}

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root-redux')
  const { store } = configure()

  function doRender () {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Error doReset={() => store.dispatch({ type: 'error:reset' })}/>
          <Auth
            doAuth={({ name, password }) => {
              doAuthFetch(store.dispatch, name, password)
                .then((error) => { error || doDataFetch(store.dispatch, store.getState().auth.token) })
            }}
            doReset={() => store.dispatch({ type: 'auth:reset' })}
          />
          <Data
            doFetch={(token) => doDataFetch(store.dispatch, token)}
            doReset={() => store.dispatch({ type: 'data:reset' })}
          />
        </div>
      </Provider>,
      rootElement
    )
  }

  doRender()

  window[ 'redux' ] = { doRender, rootElement, store }
})
