const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const boatRoutes = require("./routes/boatRoutes");
const reservationRoutes = require("./routes/reservation");

const adminBoatRoutes = require("./routes/adminboatRoutes");
const adminUserRoutes = require("./routes/adminuserRoutes");
const adminBookingRoutes = require("./routes/adminbookingRoutes");

const reservationController = require("./controllers/reservationController");
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Barqe Server API is running...");
});

app.use("/users", userRoutes);
app.use("/boats", boatRoutes);
app.use("/reservation", reservationRoutes);

app.use("/admin/boats", adminBoatRoutes);
app.use("/admin/users", adminUserRoutes);
app.use("/admin/booking", adminBookingRoutes);

const server = http.createServer(app);

const userSockets = {};
let userExpoTokens = {};

const logUserExpoTokens = async () => {
  userExpoTokens = await userController.getAllTokens();
};
logUserExpoTokens();

const sendNotificatoin = async (to, message) => {
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: to,
      sound: "default",
      title: "Barque",
      body: message,
    }),
  });
  result = await response.json();
  return result;
};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("requestCancel", async (data) => {
    const { userId, hostId, bookId } = data;
    console.log(data);
    let result = await reservationController.reqCancel(userId, bookId);
    if (result) {
      sendNotificatoin(userExpoTokens[hostId], "You have a new Cancel Request");
    } else {
      socket.emit("receivecancel", "You have a new Cancel Request");
    }
  });

  socket.on("registerUser", async (userId) => {
    userSockets[userId] = socket.id;
    userExpoTokens[userId] = await userController.getExpoToken(userId);
    console.log(`User ${userId} registered with socket ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
      delete userSockets[userId];
    });
  });

  socket.on("reqbooking", async (hostId) => {
    console.log(`reqbooking received for hostId: ${hostId}`);

    let result = await userController.getAdmins();
    result?.push(hostId);
    for (let i = 0; i < result.length; i++) {
      const temp = result[i];
      const hostSocketId = userSockets[temp];
      if (hostSocketId) {
        io.to(hostSocketId).emit("receivebooking", "You have a new booking 🎉");
      }
    }
    sendNotificatoin(userExpoTokens[hostId], "You have a new booking 🎉");
  });

  socket.on("addnewboat", async () => {
    let result = await userController.getAdmins();
    for (let i = 0; i < result.length; i++) {
      const temp = result[i];
      const hostSocketId = userSockets[temp];
      if (hostSocketId) {
        io.to(hostSocketId).emit("alertaddnewboat", "Added new boat 🎉");
      }
    }
  });

  socket.on("alertsetboatdoc", async ({ message, userId }) => {
    sendNotificatoin(userExpoTokens[userId], message);
  });

  socket.on("adminresbooking", ({ userId, hostId, message }) => {
    sendNotificatoin(userExpoTokens[hostId], message);
    sendNotificatoin(userExpoTokens[userId], message);
  });

  socket.on("hostresbooking", ({ userId, message }) => {
    sendNotificatoin(userExpoTokens[userId], message);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
