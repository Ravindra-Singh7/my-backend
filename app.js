require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://my-backend:ravi123@cluster0.jplq5sh.mongodb.net/?appName=Cluster0")
  .then(() => { console.log("Database connect ho gaya!"); })
  .catch((error) => { console.log("Error:", error); });

const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscription");

app.use("/", authRoutes);
app.use("/", subscriptionRoutes);

app.use((err, req, res, next) => {
  console.log("Error:", err.message);
  res.status(500).json({ message: "Kuch galat ho gaya!", error: err.message });
});

app.listen(3000, () => {
  console.log("Server chalu hai!");
});