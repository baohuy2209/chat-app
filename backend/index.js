const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const http = require("http");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/auth");
dotenv.config();
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connection established."))
  .catch((err) => console.log(err));
io.on("connection", (socket) => {
  console.log("a user connected");
});
// const socket = io();
// socket.io("connect", () => {
//   console.log("Connected to server");
// });
app.use("/api/auth", authRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost${process.env.PORT}`);
});
