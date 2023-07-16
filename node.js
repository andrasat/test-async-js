const crypto = require("node:crypto")
const http = require("node:http")
const util = require("./util")

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/": {
      const str = "Healthy"
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(str),
        "Content-Type": "text/plain",
      })
      res.write(str)
      res.end()
      break
    }
    case "/ping": {
      const data = { data: "PONG" }
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(JSON.stringify(data)),
        "Content-Type": "application/json",
      })
      res.write(JSON.stringify(data))
      res.end()
      break
    }
    case "/blocking": {
      const hash = crypto.createHash("sha256")

      for (let i = 0; i < 1e7; i++) {
        hash.update(util.getRandomString())
      }

      const data = { data: hash.digest("hex") }
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(JSON.stringify(data)),
        "Content-Type": "application/json",
      })
      res.write(JSON.stringify(data))
      res.end()

      break
    }
    case "/not-blocking": {
      const hash = crypto.createHash("sha256")

      for (let i = 0; i < 1e7; i++) {
        await util.runAsync(() => hash.update(util.getRandomString()))
      }

      const data = { data: hash.digest("hex") }
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(JSON.stringify(data)),
        "Content-Type": "application/json",
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

server.on("request", (req, res) => {
  process.stdout.write(`NODE:${req.method}:${req.url}:${new Date().toISOString()}\n`)
})

server.listen(3030, () => {
  process.stdout.write("Server is running on port 3030\n")
})
