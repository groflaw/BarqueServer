const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const boatRoutes = require("./routes/boatRoutes");
const reservationRoutes = require("./routes/reservation");

const adminBoatRoutes = require("./routes/adminboatRoutes");
const adminUserRoutes = require("./routes/adminuserRoutes");
const adminBookingRoutes = require("./routes/adminbookingRoutes");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

io.on("connection", (socket) => {
  console.log(`[${socket.id}] socket connected`);
  socket.on("disconnect", (reason) => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
