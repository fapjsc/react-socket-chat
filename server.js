const express = require("express");
const http = require("http");
var cors = require("cors");

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", socket => {
    // Welcome user
    socket.emit("message", "welcome");

    // 用戶連接時
    socket.broadcast.emit("message", "A user has joined the chat"); // 除了正在連接的user都會收到

    // 用戶段線
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat"); // 所有user 都會收到
    });
});

const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
