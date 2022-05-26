/// To handle error
/// Try catch and async and await || Use promise everywhere

module.exports = (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
};
