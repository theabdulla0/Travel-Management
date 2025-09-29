const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();
// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// };

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", require("./routes/user.route"));
app.use("/api/trip", require("./routes/trip.route"));
app.use("/api", require("./routes/image.route"));

app.use((req, res) => {
  res.send("404! Page not Found");
});
connectDB();
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   connectDB();
//   console.log("Server running");
// });
