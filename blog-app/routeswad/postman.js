const express = require("express");
const router = express.Router();
const User = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

// Login Route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email, password });

  if (!user) return res.status(400).send("Invalid email or password");

  // Generating Token with JWT
  let newUser = _.pick(user, ["_id", "name", "email"]);
  const token = jwt.sign(newUser, process.env.JWTSECRET, { expiresIn: "1h" });

  res.send({ message: "Login Successful!", token: token });
});

module.exports = router;
