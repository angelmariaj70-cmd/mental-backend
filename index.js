const express = require('express')
require('dotenv').config()
const mentalServer = express()

require('./config/db')

const userRoute = require('./routes/userRoute')
const questionRoute = require('./routes/questionRoute')
const doctorRouter = require('./routes/doctorRoute')

const cors = require('cors')
mentalServer.use(cors())
mentalServer.use(express.json())
mentalServer.use("/uploads", express.static("uploads"));
mentalServer.use(userRoute)
mentalServer.use(questionRoute)
mentalServer.use(doctorRouter)

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(mentalServer);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://mental-frontend-five.vercel.app"
    ],
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receiveMessage", {
      message,
      sender
    });
  });

}); 


const PORT = process.env.PORT || 3000;

mentalServer.get('/', (req, res) => {
  res.send("Mental application started")
})

server.listen(PORT, () => {
  console.log("Mental server running on", PORT);
});