// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message });
};
