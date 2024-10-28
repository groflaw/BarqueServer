const User = require("../models/user"); // Example model

exports.createUser = async (req, res) => {
  const newUser = new User(req.body.personInfo);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Could not create user" });
  }
};
