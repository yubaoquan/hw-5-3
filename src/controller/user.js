const { pick } = require('lodash');
const User = require('../model/user');

exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    res.json({ user: user ? pick(user, ['_id', 'username', 'email']) : null });
  } catch (e) {
    next(e);
  }
};
