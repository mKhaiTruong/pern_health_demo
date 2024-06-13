const Gun = require("gun");
require('gun/axe');
require('gun/sea');
const express = require("express");
const app = express();
const server = require("http").createServer(app);

// Attach Gun to WebSocket server
const gun = Gun({ web: server });

gun.on("hi", (peer) => {
  console.log("peer connected!");
});

gun.on("bye", (peer) => {
  console.log("peer disconnected!");
});

module.exports = gun;
