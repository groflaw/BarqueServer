const User = require("../models/user");
const bcrypt = require("bcrypt");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      return res.json({
        flag: false,
        sort: "email",
        error: "Email already exists",
      });
    }
    await newUser.save();

    res.json({ flag: true, data: newUser });
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Could not create user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, expoPushToken } = req.params;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
        flag: false,
        sort: "email",
        error: "Unregistered user",
      });
    }

    const isMatch = password === existingUser.password;
    if (!isMatch) {
      return res.json({
        flag: false,
        sort: "password",
        error: "Incorrect password",
      });
    } else {
      existingUser.expoPushToken = expoPushToken;
      await existingUser.save();
    }
    res.json({ flag: true, existingUser });
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Server error" });
  }
};

exports.setAvatar = async (req, res) => {
  const userId = req.params.id;
  const files = req.files["photo"];
  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ errors: { general: "No files were uploaded." } });
  }
  try {
    const user = await User.findOne({ _id: userId });
    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `users/${userId}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      user.avatar = uploadResult.Location;
      await user.save();
    }
    res.json({ flag: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};

exports.changeProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.birthDay = req.body.birthDay;
    user.address = req.body.address;
    user.country = req.body.country;
    user.city = req.body.city;
    user.bio = req.body.bio;
    await user.save();
    res.json({ flag: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};

exports.setNotifi = async (req, res) => {
  const { field, value } = req.body;
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    user.notification[field] = value;
    await user.save();
    res.json({ flag: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error fetching the data." },
    });
  }
};

exports.addCoHost = async (req, res) => {
  const { email, idNumber } = req.body;
  try {
    let cohost = await User.findOne({ email: email });
    if (cohost) {
      const uploadToS3 = async (file) => {
        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: `users/${cohost._id}/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
      };
      const profileImageUrl = await uploadToS3(req.files["profileImage"][0]);
      const frontIDUrl = await uploadToS3(req.files["frontID"][0]);
      const backIDUrl = await uploadToS3(req.files["backID"][0]);
      cohost.avatar = profileImageUrl;
      cohost.idImage.front = frontIDUrl;
      cohost.idImage.back = backIDUrl;
      cohost.idNumber = idNumber;
      await cohost.save();
      const user = await User.findOne({ _id: req.params.id });
      user.cohost = cohost._id;
      await user.save();
      res.json({ flag: true, data: user });
    } else {
      res.json({
        flag: false,
        sort: "general",
        error: "Co-Host is an unregistered user",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.json({ flag: true, data: user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error get the CoHost profile" },
    });
  }
};

exports.changePassword = async (req, res) => {
  const { curpassword, newpassword } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.id });
    const isMatch = await bcrypt.compare(curpassword, user.password);
    if (!isMatch) {
      return res.json({
        flag: false,
        sort: "curpassword",
        error: "Incorrect password",
      });
    } else {
      const saltRounds = 10;
      user.password = await bcrypt.hash(newpassword, saltRounds);
      await user.save();
      res.json({ flag: true, data: user });
    }
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Server error" });
  }
};

//---------Socket Function------------//
exports.getAdmins = async () => {
  try {
    let admins = await User.find({ role: { $ne: 0 } });
    return admins;
  } catch (error) {
    return [];
  }
};

exports.getExpoToken = async (userId) => {
  try {
    let user = await User.findOne({ _id: userId });
    return user.expoPushToken;
  } catch (error) {
    return "";
  }
};

exports.getAllTokens = async () => {
  try {
    const usersWithTokens = await User.find({}, "_id expoPushToken");
    const userExpoTokens = {};
    usersWithTokens.forEach((user) => {
      if (user.expoPushToken) {
        userExpoTokens[user._id] = user.expoPushToken; // Using user._id as the key
      }
    });
    return userExpoTokens;
  } catch (error) {
    return {};
  }
};
