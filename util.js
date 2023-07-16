const crypto = require("node:crypto")

function getRandomString() {
  const stringSize = 20
  const randomString = crypto.randomBytes(stringSize).toString()
  return randomString
}

function runAsyncSetTimeout1(fn) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn()
      resolve()
    }, 1)
  )
}

function runAsyncSetTimeout0(fn) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn()
      resolve()
    }, 0)
  )
}

function runAsyncSetImmediate(fn) {
  return new Promise((resolve) =>
    setImmediate(() => {
      fn()
      resolve()
    })
  )
}

module.exports = {
  getRandomString,
  runAsyncSetTimeout1,
  runAsyncSetTimeout0,
  runAsyncSetImmediate,
}
