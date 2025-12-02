const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

// use routes
app.use("/api/user", userRouter);

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/userDB") // local DB name: userDB
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3001, () => console.log("Server running on port 3001"));
  })
  .catch((err) => console.log("Database connection error:", err));
