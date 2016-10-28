var express = require('express'),
    server = express();

server.get('/', function(req, res) {
  res.send('Hello world');
});

server.listen(8080, function () {
  console.log('Server listening on port 8080');
});

