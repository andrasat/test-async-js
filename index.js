const http = require('http');
const crypto = require('crypto');

function getRandomString() {
  const stringSize = 20;
  const randomString = crypto.randomBytes(stringSize).toString();
  return randomString;
}

const server = http.createServer(async (req, res) => {
  switch(req.url) {
    case '/': {
      const str = 'Healthy'
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(str),
        'Content-Type': 'text/plain'
      })
      res.write(str)
      res.end()
      break
    }
    case '/ping': {
      const data = { data: 'PONG' }
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(JSON.stringify(data)),
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify(data))
      res.end()
      break
    }
    case '/blocking': {
      const hash = crypto.createHash('sha256')

      for (let i = 0; i < 1e7; i++) {
        hash.update(getRandomString())
      }

      const data = { data: hash.digest('hex') }
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(JSON.stringify(data)),
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify(data))
      res.end()

      break
    }
    case '/not-blocking': {
      const hash = crypto.createHash('sha256')

      const immediate = (fn) => new Promise(resolve => setImmediate(() => {
        fn()
        resolve()
      }))

      for (let i = 0; i < 1e7; i++) {
        await immediate(() => hash.update(getRandomString()))
      }

      const data = { data: hash.digest('hex') }
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(JSON.stringify(data)),
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify(data))
      res.end()

      break
    }
    default:
      res.writeHead(404)
      res.end()
  }
})

server.on('connection', (socket) => {
  console.log('New connection...');
})

server.on('request', (req, res) => {
  process.stdout.write(`${req.method}:${req.url}:${new Date().toISOString()}\n`)
})

server.on('upgrade', (req, socket, head) => {
  console.log('Upgrade connection...');
})

server.listen(3030, () => {
    console.log('Server is running on port 3030');
})