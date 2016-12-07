const { startServer } = require('./server')
const { getServerState, SERVER_STATE } = require('./routeReducer')

function parseJsonData (text) { try { return text && JSON.parse(text) } catch (error) { return '' }}
function stringifyJsonData (object) { try { return object && JSON.stringify(object) } catch (error) { return null }}

const HOST_NAME = 'localhost'
const PORT = 3000

let serverState = SERVER_STATE
startServer(PORT, HOST_NAME, (server, request, response, buffer) => {
  const { statusCode, body, state } = getServerState(serverState, request.url, parseJsonData(buffer.toString()))
  serverState = state || serverState
  if (body) body.timestamp = Date.now()
  response.writeHead(statusCode, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' })
  setTimeout(() => response.end(stringifyJsonData(body)), statusCode === 200 ? 1000 : 0) // add delay for pending state
  console.log('req', request.url, '=>', statusCode, body)
})
