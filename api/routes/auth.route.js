const express = require("express");
const { signin, signup, signOut } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signOut);

module.exports = router;