var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var fs = require('fs');

//Gere les route avec express
app.use(express.static(__dirname + '/public'));

// On ecoute le port 3000
server.listen(3000);
