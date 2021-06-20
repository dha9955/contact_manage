const User = require("../model/user");
const bcrypt = require("bcrypt");


//
exports.getAllUser = (req, res) => {
  User.find().exec((error, users) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      res.status(200).json({ users });
    }
  });
};

//
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "email is already registered",
      });
    }
    const {
      email,
      password
    } = req.body
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      email,
      hash_password,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: " Account created successfully...!",
        });
      }
    });
  });
};

//
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const { _id, email } = user;
        res.status(200).json({
          user: {
            _id,
            email,
          },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

//
exports.signout = (req, res) => {
  res.clearCookie("user");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};