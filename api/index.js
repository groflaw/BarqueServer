const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const boatRoutes = require("./routes/boatRoutes");
const reservationRoutes = require("./routes/reservation");

const adminBoatRoutes = require("./routes/adminboatRoutes");
const adminUserRoutes = require("./routes/adminuserRoutes");
const adminBookingRoutes = require("./routes/adminbookingRoutes");

const reservationController = require("./controllers/reservationController");

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

const userSockets = {}; // Store user IDs and their socket IDs

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("requestCancel", async (data) => {
    let result = await reservationController.reqCancel(data.userId);
    if (result.flag === true) {
      socket.emit("resrequestCancel", {
        status: "success",
        message: "Cancellation request processed.",
      });
    } else {
      socket.emit("resrequestCancel", {
        status: "error",
        message: "Error processing cancellation request.",
      });
    }
  });

  socket.on("registerUser", (userId) => {
    userSockets[userId] = socket.id; // Map userId to socket ID
    console.log(`User ${userId} registered with socket ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
      delete userSockets[userId]; // Clean up mapping
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
