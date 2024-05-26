const express = require("express");
const auth = require("../auth/auth.model");

const router = express.Router();

router.post("/register", auth.registerController);

module.exports = router;
