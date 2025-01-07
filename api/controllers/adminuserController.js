const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          role: 0,
        },
      },
      {
        $lookup: {
          from: "boats",
          localField: "_id",
          foreignField: "user",
          as: "boats",
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          avatar: 1,
          address: 1,
          country: 1,
          city: 1,
          email: 1,
          birthDay: 1,
          phoneNumber: 1,
          notification: 1,
          cohost: 1,
          idNumber: 1,
          idImage: 1,
          bio: 1,
          review: 1,
          booking: 1,
          resrate: 1,
          block: 1,
          boatCount: { $size: "$boats" },
          boats: {
            $map: {
              input: "$boats",
              as: "boat",
              in: {
                _id: "$$boat._id",
                model: "$$boat.model",
              },
            },
          },
        },
      },
    ]);

    res.json({
      flag: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
exports.updateInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    user.firstName = req.body.data.firstName;
    user.lastName = req.body.data.lastName;
    user.email = req.body.data.email;
    user.birthDay = req.body.data.birthDay;
    user.phoneNumber = req.body.data.phoneNumber;
    user.address = req.body.data.address;
    user.city = req.body.data.city;
    user.country = req.body.data.country;
    user.idNumber = req.body.data.idNumber;
    await user.save();
    res.json({
      flag: true,
      data: req.body,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    user.block = req.body.value;
    await user.save();
    res.json({
      flag: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: { $ne: 0 } });
    res.json({
      flag: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
exports.addAdmin = async (req, res) => {
  try {
    const newUser = new User(req.body.data);
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      existingUser.role = req.body.data.role;
      res.json({ flag: true, data: existingUser });
    } else {
      await newUser.save();
      res.json({ flag: true, data: newUser });
    }
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Could not update admin" });
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const updateData = req.body.data;
    const updatedAdmin = await User.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true,
    });
    res.json({
      flag: true,
      data: updatedAdmin,
    });
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Could not update admin" });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await User.findOne({ _id: adminId });
    admin.role = 0;
    await admin.save();
    res.json({
      flag: true,
      data: admin,
    });
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Could not delete admin" });
  }
};
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.params;
    const existingUser = await User.findOne({ email: email, role: { $ne: 0 } });
    if (!existingUser) {
      return res.json({
        flag: false,
        sort: "email",
        error: "Unregistered Admin",
      });
    }
    const isMatch = password === existingUser.password;
    if (!isMatch) {
      return res.json({
        flag: false,
        sort: "password",
        error: "Incorrect password",
      });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ flag: true, token, existingUser });
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Could not Login admin" });
  }
};
exports.authenticateToken = (req, res, next) => {
  const token = req.headers["Authorization"]?.split(" ")[1];
  console.log(req.headers["Authorization"]);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
exports.checkToken = (req, res) => {
  res.json({
    flag: true,
  });
};
