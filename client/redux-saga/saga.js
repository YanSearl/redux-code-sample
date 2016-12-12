import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import fetchJson from '../fetchJson'

function* workerDataFetch ({ payload }) {
  const { token } = payload
  yield put({ type: 'data:pending' })
  try {
    const result = yield call(() => fetchJson('/data', { token }))
    yield put({ type: 'data:set', payload: { data: result } })
  } catch (error) {
    yield put({ type: 'error:set', payload: { error: 'Data Error' } })
  }
}

function* workerAuthDataFetch ({ payload }) {
  const { name, password } = payload
  yield put({ type: 'auth:pending' })
  try {
    const result = yield call(() => fetchJson('/auth', { name, password }))
    yield put({ type: 'auth:set', payload: { token: result.token } })
    yield call(workerDataFetch, { payload: { token: result.token } })
  } catch (error) {
    yield put({ type: 'error:set', payload: { error: 'Auth Error' } })
  }
}

export default function* () {
  yield takeEvery('saga:auth:fetch', workerAuthDataFetch)
  yield takeEvery('saga:data:fetch', workerDataFetch)
}
