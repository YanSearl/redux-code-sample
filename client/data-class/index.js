import React from 'react'
import ReactDOM from 'react-dom'

import { Auth, Data, Error } from '../react'
import DataClass from './data'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root-data-class')

  const dataStore = {
    auth: new DataClass.Auth(),
    data: new DataClass.Data(),
    error: new DataClass.Error()
  }

  function doRender (error = null) {
    error && dataStore.error.set(error)
    ReactDOM.render(
      <div>
        <Error
          error={dataStore.error.error}
          doReset={() => {
            dataStore.error.reset()
            dataStore.auth.reset()
            dataStore.data.reset()
            doRender()
          }}
        />
        <Auth
          isPending={dataStore.auth.isPending}
          token={dataStore.auth.token}
          doAuth={({ name, password }) => {
            dataStore.auth.doAuth(name, password, (error) => {
              error || dataStore.data.doFetch(dataStore.auth.token, doRender)
              doRender(error)
            })
            doRender()
          }}
          doReset={() => {
            dataStore.auth.reset()
            doRender()
          }}
        />
        <Data
          token={dataStore.auth.token}
          data={dataStore.data.data}
          isPending={dataStore.data.isPending}
          doFetch={(token) => {
            dataStore.data.doFetch(token, doRender)
            doRender()
          }}
          doReset={() => {
            dataStore.data.reset()
            doRender()
          }}
        />
      </div>,
      rootElement
    )
  }

  doRender()

  window[ 'data-class' ] = {
    doRender,
    rootElement,
    dataStore
  }
})
