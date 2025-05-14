const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const mainRoom = {
  id: 'main',
  users: [],
  history: []
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Public chat: automatically join everyone
  mainRoom.users.push(socket.id);
  socket.join(mainRoom.id);
  socket.emit("room_history", mainRoom.history);
  socket.emit("room_joined", { success: true, room: mainRoom.id, usersCount: mainRoom.users.length });
  io.emit("room_users", mainRoom.users.length);

  // No-op for leave_room
  socket.on("leave_room", () => {});

  // Мессеж илгээх логик
  socket.on("send_message", (data) => {
    const messageData = {
      ...data,
      room: mainRoom.id
    };
    mainRoom.history.push(messageData);
    // Keep only last 100 messages
    if (mainRoom.history.length > 100) {
      mainRoom.history.shift();
    }
    io.emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    mainRoom.users = mainRoom.users.filter(id => id !== socket.id);
    io.emit("room_users", mainRoom.users.length);
    console.log(`User Disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});