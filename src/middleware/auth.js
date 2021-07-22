const User = require('../model/user');
const { verify } = require('../util/jwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).send('No token');

    const decodedToken = await verify(token);
    console.info(decodedToken);

    const user = await User.findOne({ _id: decodedToken.userId }).exec();
    if (!user) return res.status(401).send('No permission');

    console.info('req user:', user.toJSON());
    next();
  } catch (e) {
    next(e);
  }
};
