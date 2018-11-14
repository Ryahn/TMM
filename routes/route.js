var express = require('express');
var router = express.Router();

router.use('/', require('./index'));
router.use('/users', require('./users'));
router.use('/trainers', require('./trainers'));
router.use('/games', require('./games'));

module.exports = router;