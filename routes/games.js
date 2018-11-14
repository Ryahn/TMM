/*global db*/
const router = require('express').Router(),
    moment = require('moment'),
    fs = require('fs'),
    path = require('path'),
    jsonQuery = require('json-query'),
    gameData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../games.json')))
    ;

router.get('/all', (req, res) => {
    var title = jsonQuery(`[name=${req.query.search} | appid=${req.query.search}]`, {data: gameData});

    // console.log(title);
    if (typeof null !== title.value.name) {
        res.send(`<p>${title.value.name} - ${title.value.appid}</p>`);
    } else {
        res.send('<p>No Data</p>');
    }
    

    // console.log(results);
    // console.log(`Query: ${req.query}\n\rParams: ${req.body}`);
    // db('games').whereRaw(`game_title LIKE %${req.query.search}%`).orWhere('appid', '?', [req.query.search]).then(rows => {
    
    //     // console.log(rows);
    // });
    // db.select().from('games').then(rows => {
    //     res.json({results: rows});
    // });
});

module.exports = router;