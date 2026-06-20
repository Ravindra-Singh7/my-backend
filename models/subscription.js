const mongoose = require("mongoose");

const Subscription = mongoose.model("Subscription", {
  userId: String,
  plan: String,
  startDate: Date,
  endDate: Date,
  status: String
});

module.exports = Subscription;