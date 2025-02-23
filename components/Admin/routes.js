const express = require("express");
const router = express.Router();
const adminController = require("./controller");

// admin
router.get("/", adminController.getAdmin);

//admin login
router.get("/login", adminController.loginForm);
// login form submission
router.post("/login", adminController.login);

// admin registration
router.get("/register", adminController.registerForm);
router.post("/register", adminController.register);

// admin logout
router.get("/logout", adminController.logout);

module.exports = router;