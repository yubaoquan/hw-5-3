const User = require('../model/user');

exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).exec();
    res.json({ user });
  } catch (e) {
    next(e);
  }
};
