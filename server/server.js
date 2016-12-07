const http = require('http')

function startServer (port, hostName, onRequestReady) {
  const server = http.createServer((request, response) => {
    let data = []
    request.addListener('data', (chunk) => {
      data.push(chunk)
    })
    request.addListener('end', () => {
      onRequestReady(server, request, response, Buffer.concat(data))
      // response.finished || response.end() // force end the response pending
    })
  })
  server.listen(port, hostName)
  console.log('Server running at port', port, 'hostName', hostName)
  return server
}

module.exports = {
  startServer
}
