const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./config/db"); // Import your db connection
const userRoutes = require("./routes/userRoutes");
const boatRoutes = require("./routes/boatRoutes");
const reservationRoutes = require("./routes/reservation");

const AdminBoatRoutes = require("./routes/adminboatRoutes");
const AdminUserRoutes = require("./routes/adminuserRoutes");
const AdminBookingRoutes = require("./routes/adminbookingRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
connectDB();

// Define your routes here (example)
app.get("/", (req, res) => {
  res.send("Barqe Server API is running...");
});

app.use("/users", userRoutes);
app.use("/boats", boatRoutes);
app.use("/reservation", reservationRoutes);

app.use("/admin/boats", AdminBoatRoutes);
app.use("/admin/users", AdminUserRoutes);
app.use("/admin/booking", AdminBookingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
