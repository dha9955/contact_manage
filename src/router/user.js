const express = require("express");
const { getAllUser, signup, signin, signout } = require("../controller/user");
const router = express.Router();

//
router.get("/getallusers", getAllUser);

//
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports = router;
