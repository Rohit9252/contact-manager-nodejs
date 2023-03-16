const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const valiadateToken = require('../middleware/validateTokenHandler');




const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", valiadateToken, currentUser);


module.exports = router;