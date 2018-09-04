const fs = require('fs')
const path = require('path')

const dist = path.join(__dirname, './dist')
const stat = fs.existsSync(dist)
if (!stat) {
  return
}
const files = fs.readdirSync(dist)

files.forEach(file => {
  const stats = fs.statSync(dist + '/' + file)
  if (stats.isFile) {
    fs.unlinkSync(dist + '/' + file)
    console.log('delete', file)
  }
})
