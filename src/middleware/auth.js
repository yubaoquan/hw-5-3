const User = require('../model/user');
const { verify } = require('../util/jwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace(/^Bearer /, '');
    if (!token) return res.status(401).send('No token');

    const decodedToken = await verify(token);
    console.info(decodedToken);

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) return res.status(401).send('No permission');

    next();
  } catch (e) {
    next(e);
  }
};
