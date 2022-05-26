const express = require("express");
const router = express.Router();

/// Import the controller
const { home, homeDummy } = require("../controller/homeController");

router.route("/").get(home);

router.route("/dummy").get(homeDummy);

module.exports = router;
