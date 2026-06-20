require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscription");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("Database connect ho gaya!");
})
.catch((error) => {
  console.log("Error:", error);
});

app.use(authRoutes);

app.use(subscriptionRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Error:", err.message);
  res.status(500).json({ message: "Kuch galat ho gaya!", error: err.message });
});

app.listen(3000, () => {
  console.log("Server chalu hai!");
});