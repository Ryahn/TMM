const router = require('express').Router();

router.get('/', function (req, res) {
    res.render('dashboard/index');
    // res.send(`Path ${__dirname}`);
});

module.exports = router;