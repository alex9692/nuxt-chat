const SocketIO = require("socket.io");
const http = require("http");
const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");

const app = express();
const isProd = process.env.NODE_ENV === "production";
const server = http.createServer(app);
const io = SocketIO(server);

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !isProd;

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
  // const messages = [];
  // io.on("connection", socket => {
  //   socket.on("last-messages", function(fn) {
  //     fn(messages.slice(-50));
  //   });
  //   socket.on("send-message", function(message) {
  //     messages.push(message);
  //     socket.broadcast.emit("new-message", message);
  //   });
  // });
  let users = [];
  io.on("connection", function(socket) {
    socket.on("disconnect", function() {
      console.log("User disconnected");
    });
    socket.on("log-out", function(user) {
      users = users.filter(el => el._id !== user._id);
      io.emit("logged-users", users);
      console.log("User logged out " + user.username);
    });
    socket.on("connection-established", function(user) {
      const found = users.find(el => el._id === user._id);
      if (!found) {
        users.push(user);
      }
      io.emit("logged-users", users);
      console.log("User logged in " + user.username);
    });
    socket.on("get-message", function(message) {
      io.emit("new-message", message);
    });
    socket.on("get-users", function() {
      io.emit("logged-users", users);
    });
  });
}
start();
