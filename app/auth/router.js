const express = require("express");
const router = express.Router();
const { viewLogin, viewSignUp, actionLogin, actionSignUp, logOut } = require("./controller");

router.get('/login', viewLogin);
router.post('/login', actionLogin);
router.get('/signup', viewSignUp);
router.post('/signup', actionSignUp);
router.get('/logout', logOut);

module.exports = router;