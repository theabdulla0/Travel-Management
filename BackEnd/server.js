const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", require("./routes/user.route"));
app.use("/api/trip", require("./routes/trip.route"));
app.use("/api", require("./routes/image.route"));

app.use((req, res) => {
  console.log("404! Page not Found");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server running");
});
