const User = require("../models/user");
const bcrypt = require("bcrypt");

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
        Key: `users/${boatId}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      user.avatar = uploadResult.Location;
      await boat.save();
    }
    res.json({ flag: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};
