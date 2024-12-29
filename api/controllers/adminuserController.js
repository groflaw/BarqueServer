const User = require("../models/user");
const Boat = require("../models/boat");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.aggregate([
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
          boatCount: { $size: "$boats" }, // Count of boats
          boats: {
            $map: {
              input: "$boats",
              as: "boat",
              in: {
                _id: "$$boat._id", // Boat ID
                model: "$$boat.model", // Boat model
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
