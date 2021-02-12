const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const { uniqueNamesGenerator, adjectives, colors } = require('unique-names-generator');

const users = {};

io.on('connection', socket => {
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }

    const uname = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        length: 2
    })

    socket.emit("yourID", socket.id);
    socket.emit("yourName", uname);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('letsRock', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});

server.listen(8060, () => console.log('server is running on port 8060'));


