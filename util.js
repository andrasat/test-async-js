const crypto = require('node:crypto');

function getRandomString() {
  const stringSize = 20;
  const randomString = crypto.randomBytes(stringSize).toString();
  return randomString;
}

function runAsync(fn) {
  return new Promise(resolve => setTimeout(() => {
    fn()
    resolve()
  }, 0))
}

module.exports = {
  getRandomString,
  runAsync
}