import { connect } from 'react-redux'

import * as Component from './react'

const Auth = connect((state) => {
  return {
    token: state.auth.token,
    isPending: state.auth.isPending
  }
})(Component.Auth)

const Data = connect((state) => {
  return {
    token: state.auth.token,
    data: state.data.data,
    isPending: state.data.isPending
  }
})(Component.Data)

const Error = connect((state) => {
  return {
    error: state.error
  }
})(Component.Error)

export {
  Auth, Data, Error
}