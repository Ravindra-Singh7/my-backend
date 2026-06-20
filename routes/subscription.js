const express = require("express");

const Subscription = require("../models/subscription");

const tokenCheck = require("../middleware/tokenCheck");

const router = express.Router();

router.post("/subscribe", tokenCheck, async (req, res) => {
  try {

    const startDate = new Date();

    const endDate = new Date();

    endDate.setMonth(endDate.getMonth() + 1);

    const subscription = new Subscription({
      userId: req.userId,
      plan: req.body.plan,
      startDate,
      endDate,
      status: "active"
    });

    await subscription.save();

    res.json({
      message: "Subscription ho gaya!",
      subscription
    });

  } catch (err) {
    res.json({
      message: "Error aaya!",
      error: err.message
    });
  }
});

router.get("/my-subscription", tokenCheck, async (req, res) => {
  try {

    const subscription = await Subscription.findOne({
      userId: req.userId
    });

    if (!subscription) {
      return res.json({
        message: "Koi subscription nahi hai!"
      });
    }

    res.json({ subscription });

  } catch (err) {
    res.json({
      message: "Error aaya!",
      error: err.message
    });
  }
});

router.put("/cancel-subscription", tokenCheck, async (req, res) => {
  try {

    const subscription = await Subscription.findOneAndUpdate(
      { userId: req.userId },
      { status: "cancelled" },
      { returnDocument: "after" }
    );

    if (!subscription) {
      return res.json({
        message: "Koi subscription nahi hai!"
      });
    }

    res.json({
      message: "Subscription cancel ho gaya!",
      subscription
    });

  } catch (err) {
    res.json({
      message: "Error aaya!",
      error: err.message
    });
  }
});

router.put("/update-subscription", tokenCheck, async (req, res) => {
  try {

    const subscription = await Subscription.findOneAndUpdate(
      { userId: req.userId },
      { plan: req.body.plan },
      { returnDocument: "after" }
    );

    if (!subscription) {
      return res.json({
        message: "Koi subscription nahi hai!"
      });
    }

    res.json({
      message: "Plan update ho gaya!",
      subscription
    });

  } catch (err) {
    res.json({
      message: "Error aaya!",
      error: err.message
    });
  }
});

module.exports = router;