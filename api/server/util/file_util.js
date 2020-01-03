const fs = require('fs')
const path = require('path')

class FileUtil {
  constructor(showLogs = true) {
    this.showLogs = showLogs;
  }
  logThis(color, text) {
    if (this.showLogs) {
      console.log(color, text);
    }
  }
  checkForAllFile(filePath, freshObj) { // If "all" file doesn't exist, create it
    if (!fs.existsSync(filePath)) {
      this.logThis(`\x1b[2m`, `${filePath} file not found`)
      return freshObj
    } else {
      // this.readJSON(filePath)
      return require(`.${filePath}`)
    }
  }
  checkExistsRun(filePath, data, callback) {
    if (fs.existsSync(filePath)) {
      callback(filePath, data)
    } else {
      // callback(null)
      this.logThis(`\x1b[31m%s\x1b[0m`, `ERROR: Something went wrong`)
      this.logThis(`\x1b[31m%s\x1b[0m`, `If you're missing this file: "${filePath}.json"`)
      this.logThis(`\x1b[31m%s\x1b[0m`, `Try running "npm run fetch"`)
    }
  }
  checkNotExistsRun(filePath, data, callback) {
    if (!fs.existsSync(filePath)) {
      this.logThis(`\x1b[2m`, `${filePath} file not found`)
      callback(filePath, data)
    } else {
      // callback(null)
      this.logThis(`\x1b[31m%s\x1b[0m`, `${filePath} file already exists`)
    }
  }
  saveFile(filePath, data) {
    fs.writeFile(filePath, data, (err) => {
      this.logThis(`\x1b[36m%s\x1b[0m`, `File successfully written!`)
      this.logThis(`\x1b[36m%s\x1b[0m`, `Check your project directory for the ${filePath} file`)
    })
  }
  saveJSON(filePath, json) {
    this.saveFile(filePath, JSON.stringify(json, null, 4))
  }
  readJSON(filePath, callback) {
    this.checkExistsRun(filePath, null, (filePath, json) => {
      fs.readFile(filePath, 'utf8', (err, new_json) => { callback(JSON.parse(new_json)) })
    })
  }
}

module.exports = FileUtil;
