const BigPromise = require("../middleware/bigPromise");

exports.home = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from dummy api now i am changing it",
  });
});

exports.homeDummy = (req, res) => {
  const random = Math.floor(Math.random() * 3);

  switch (random) {
    case 0:
      res.status(200).json({
        success: true,
        message: "Hello from API",
      });
      break;

    case 1:
      res.status(400).json({
        success: false,
        message: "Bad request from user side",
      });
      break;
    case 2:
      res.status(500).json({
        success: false,
        message: "Server internal issue",
      });
      break;
  }
};
