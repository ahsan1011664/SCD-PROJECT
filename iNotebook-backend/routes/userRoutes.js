const express = require('express');   // importing Express
const { validationRules, validate } = require("../middleware/validationMiddleware");
const {registerUser, loginUser, getUserDetails} = require("../controllers/userController");
const {authenticateUser} = require('../middleware/authMiddleware')

const router = express.Router();

// Route 1: Register User
router.post("/register", validationRules('register'), validate, registerUser);
                                        
// Route 2: Login User
router.post('/login',validationRules('login'), validate, loginUser);

// ROUTE 3: Get User Details
router.post('/getuser', authenticateUser, getUserDetails);

module.exports = router