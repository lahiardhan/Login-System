const express = require('express');
const router = express.Router();
const { index, dashboard } = require('./controller');
const {ensureAuthenticated} = require("../middleware/auth");

router.get('/', index);
router.get('/dashboard', ensureAuthenticated, dashboard);

module.exports = router;