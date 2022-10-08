const express = require("express");
const router = express.Router();

const mainController = require("../controllers/main.controller");

router.get ("/", mainController.index);

router.get ("/index", mainController.index);

module.exports = router;