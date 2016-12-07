function getServerState (state, url, data) {
  switch (url) {
    case '/':
      return {
        statusCode: 200,
        body: state,
        state: state
      }
    case '/auth':
      if (!data) break
      const { name, password } = data
      const user = state.userList.find((v) => (v.name === name && v.password === password))
      if (!user) break
      const token = `token|${user.id}|${name}`
      return {
        statusCode: 200,
        body: { token },
        state: { tokenMap: Object.assign({}, state.tokenMap, { [token]: user.id }), userList: state.userList }
      }
    case '/data':
      if (!data) break
      const userId = state.tokenMap[ data.token ]
      if (!userId) break
      return {
        statusCode: 200,
        body: state.userList.find((v) => (v.id === userId)),
        state
      }
  }
  return {
    statusCode: 404,
    body: '',
    state
  }
}

const SERVER_STATE = {
  tokenMap: {}, // token - userId
  userList: [ 1, 2, 3, 4 ].map((v) => ({ id: v, name: `u${v}`, password: `p${v}`, data: `The data of user ${v}`}))
}

console.log('SERVER_STATE', SERVER_STATE)

module.exports = {
  getServerState,
  SERVER_STATE
}