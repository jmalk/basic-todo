var express = require('express'),
    server = express(),
    fs = require('fs');

server.get('/api/todo', function(req, res) {
  var filestream = fs.createReadStream('todo-list.json');
  filestream.pipe(res);
});

server.listen(8080, function () {
  console.log('Server listening on port 8080');
});

