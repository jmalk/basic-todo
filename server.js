var express = require('express'),
    server = express(),
    fs = require('fs');

server.get('/api/todo', (req, res) => {
  fs.createReadStream('todo-list.json').pipe(res);
});

server.post('/api/todo/:task', (req, res) => {
  fs.readFile('todo-list.json', 'utf8', (err, data) => {
    if (err) throw err;

    var data = JSON.parse(data);
    data.push(req.params.task);
    data = JSON.stringify(data);

    fs.writeFile('todo-list.json', data, 'utf8', (err) => {
      if (err) throw err;
      fs.createReadStream('todo-list.json').pipe(res);
    });
  });
});

server.delete('/api/todo/:task', (req, res) => {
  fs.readFile('todo-list.json', 'utf8', (err, data) => {
    if (err) throw err;

    var data = JSON.parse(data);
    if (data.indexOf(req.params.task) !== -1) {
      data.splice(data.indexOf(req.params.task), 1);
    }
    data = JSON.stringify(data);

    fs.writeFile('todo-list.json', data, 'utf8', (err) => {
      if (err) throw err;
      fs.createReadStream('todo-list.json').pipe(res);
    });
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});

