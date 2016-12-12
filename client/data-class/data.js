import fetchJson from '../fetchJson'

class Auth {
  constructor () {
    this.isPending = false
    this.token = null
  }

  doAuth (name, password, callback) {
    this.isPending = true
    return fetchJson('/auth', { name, password })
      .then((result) => {
        this.isPending = false
        this.token = result.token
        callback()
      })
      .catch((error) => {
        callback('Auth Error')
      })
  }

  reset () {
    this.isPending = false
    this.token = null
  }
}

class Data {
  constructor () {
    this.isPending = false
    this.data = null
  }

  doFetch (token, callback) {
    this.isPending = true
    return fetchJson('/data', { token })
      .then((result) => {
        this.isPending = false
        this.data = result
        callback()
      })
      .catch((error) => {
        callback('Data Error')
      })
  }

  reset () {
    this.isPending = false
    this.data = null
  }
}

class Error {
  constructor () {
    this.error = null
  }

  set (error) {
    this.error = error
  }

  reset () {
    this.error = null
  }
}

export default {
  Auth,
  Data,
  Error
}
