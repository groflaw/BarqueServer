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

const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from this origin and my frontend port = 5173
    methods: ["GET", "POST","PUT","DELETE"], // Allow these HTTP methods
  },
});

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("reqCancel", (data) => {
    console.log("Cancel request Received ", data); 
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
