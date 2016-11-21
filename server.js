var express = require('express')
var server = express()
module.exports = server
var fs = require('fs')
var path = require('path')

const TODO_LIST_FILENAME = 'todo-list.json'

server.get('/api/todo', (req, res) => {
  fs.createReadStream(TODO_LIST_FILENAME).pipe(res)
})

server.post('/api/todo/:task', (req, res) => {
  fs.readFile(TODO_LIST_FILENAME, 'utf8', (err, data) => {
    if (err) throw err

    // try catch when getting json
    data = JSON.parse(data)
    data.push(req.params.task)
    data = JSON.stringify(data)

    updateFileThenSendAsResponse(data, res)
  })
})

server.delete('/api/todo/:task', (req, res) => {
  fs.readFile(TODO_LIST_FILENAME, 'utf8', (err, data) => {
    if (err) throw err

    data = JSON.parse(data)
    // array.find exists, try it here
    if (data.indexOf(req.params.task) !== -1) {
      data.splice(data.indexOf(req.params.task), 1)
    }
    data = JSON.stringify(data)

    updateFileThenSendAsResponse(data, res)
  })
})

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

server.listen(1337, () => {
  console.log('Server listening on port 1337')
})

function updateFileThenSendAsResponse (data, res) {
  fs.writeFile(TODO_LIST_FILENAME, data, 'utf8', (err) => {
    if (err) throw err
    fs.createReadStream(TODO_LIST_FILENAME).pipe(res)
  })
}
