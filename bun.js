const crypto = require('node:crypto')
const util = require('./util')

Bun.serve({
  port: 3030,
  async fetch(req) {
    const url = new URL(req.url)
    process.stdout.write(`BUN:${req.method}:${url.pathname}:${new Date().toISOString()}\n`);

    switch (url.pathname) {
      case '/': {
        const str = 'Healthy'
        return new Response(str, {
          headers: {
            'Content-Length': Buffer.byteLength(str),
            'Content-Type': 'text/plain'
          }
        })
      }
      case '/ping': {
        const data = JSON.stringify({ data: 'PONG' })
        return new Response(data, {
          headers: {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'application/json'
          }
        })
      }
      case '/blocking': {
        const hash = crypto.createHash('sha256')

        for (let i = 0; i < 1e7; i++) {
          hash.update(util.getRandomString())
        }

        const data = JSON.stringify({ data: hash.digest('hex') })
        return new Response(data, {
          headers: {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'application/json'
          }
        })
      }
      case '/not-blocking': {
        const hash = crypto.createHash('sha256')
        const debugIteration = process.env.DEBUG ? 1e3 : 1e7

        for (let i = 0; i < debugIteration; i++) {
          await util.runAsyncSetTimeout1(() => hash.update(util.getRandomString()))
        }

        const data = JSON.stringify({ data: hash.digest('hex') })
        return new Response(data, {
          headers: {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'application/json'
          }
        })
      }
      default:
        return new Response('Not found', {
          status: 404,
          headers: {
            'Content-Length': Buffer.byteLength('Not found'),
            'Content-Type': 'text/plain'
          }
        })
    }
  }
})

process.stdout.write('Server is running on port 3030\n');