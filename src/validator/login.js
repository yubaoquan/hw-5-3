const { body } = require('express-validator');
const validate = require('../middleware/validate');
const User = require('../model/user');
const { saltMd5 } = require('../util/md5');

exports.register = validate([
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .bail()
    .custom(async (username) => {
      const user = await User.findOne({ username }).exec();
      if (user) return Promise.reject(Error('用户名已存在'));
    }),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .isEmail()
    .withMessage('邮箱格式错误')
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email }).exec();
      if (user) return Promise.reject(Error('邮箱已存在'));
    }),
  body('password').notEmpty().withMessage('密码不能为空'),
]);

exports.login = validate([
  body('email')
    .notEmpty()
    .withMessage('邮箱错误')
    .isEmail()
    .withMessage('邮箱错误'),
  body('password').notEmpty().withMessage('密码错误')
    .bail()
    .custom(async (pwd, { req }) => {
      const { email } = req.body;
      const user = await User.findOne({ email }).select({ password: 1 }).exec();
      if (user.password !== saltMd5(pwd)) return Promise.reject(Error('邮箱或密码错误'));
    }),
]);
