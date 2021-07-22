const { validationResult } = require('express-validator');

module.exports = (validations) => async (req, res, next) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const validation of validations) {
    // eslint-disable-next-line no-await-in-loop
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ error: errors.array()[0] });
};
