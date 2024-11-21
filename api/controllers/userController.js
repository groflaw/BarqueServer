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

    const saltRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    await newUser.save();

    res.json({ flag: true, newUser });
  } catch (error) {
    res.json({ flag: false, sort: "general", error: "Could not create user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.params; // Get email and password from URL parameters

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
        flag: false,
        sort: "email",
        error: "Unregistered user",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.json({
        flag: false,
        sort: "password",
        error: "Incorrect password",
      });
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