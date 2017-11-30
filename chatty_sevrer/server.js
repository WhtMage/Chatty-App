// server.js

const express = require('express');
const ws = require('ws');
const SocketServer = ws.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(socket) {

  console.log('Client connected');


  socket.on('message', function incoming(value) {

    console.log('received: %s', value);

    let valueObject = JSON.parse(value);
    console.log(valueObject);
    let valueString;

    switch(valueObject.type) {
      case 'typemessage':
        valueObject.id = uuidv4();
        break;
      case 'typenamechange':
      console.log('I am in your typenamechange')
        valueObject.id = uuidv4();
        valueObject.content = `${valueObject.oldUsername} has changed to ${valueObject.username}`
        break;
    }

    valueString = JSON.stringify(valueObject)
    wss.clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(valueString);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));
});