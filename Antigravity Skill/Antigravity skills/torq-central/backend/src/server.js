const http = require('http')
const { config } = require('./config')
const { handleHttpRequest } = require('./app')

const server = http.createServer((req, res) => {
  void handleHttpRequest(req, res)
})

server.listen(config.port, () => {
  console.log(`Torq Jarvis backend listening on http://localhost:${config.port}`)
})
