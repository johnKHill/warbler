const express = require("express");
const router = express.Router();
const { signup, signin } = require("../handlers/auth");

// the functions to the routes live in the handlers folder

// ROUTES
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;