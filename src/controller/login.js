/* eslint-disable no-underscore-dangle */
const { pick } = require('lodash');
const User = require('../model/user');
const jwt = require('../util/jwt');

exports.handleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = await jwt.sign({ userId: user._id, email: user.email });
    res.json({ success: true, token });
  } catch (e) {
    next(e);
  }
};

exports.handleRegister = async (req, res, next) => {
  try {
    const { username, email, password, bio } = req.body;
    const user = new User({ username, email, password, bio });

    await user.save();

    const userForShow = pick(user.toJSON(), ['_id', 'username', 'email', 'createdAt']);
    res.status(201).json({ success: true, user: userForShow });
  } catch (e) {
    next(e);
  }
};
