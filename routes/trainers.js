/*global db*/
const router = require('express').Router(),
    moment = require('moment');

router.get('/', (req, res) => {
    db.select('user_trainers.*', 'games.appid', 'games.game_title', 'platform.pname', 'users.username').from('user_trainers').leftJoin('games', 'user_trainers.game_id', 'games.appid').leftJoin('platform', 'user_trainers.platform_id', 'platform.pid').leftJoin('users', 'user_trainers.claim_id', 'users.id').then(rows => {
        res.render('trainers/index', {
            page: 'Trainer List',
            trainers: rows,
            moment: moment,
            csrf: req.csrfToken()
        });
        // res.json(rows);
    });
});

router.get('/modal', (req, res) => {
    db.select().from('platform').then(platforms => {
        db.select().from('trainers').then(trainers => {
            db.select('appid', 'game_title').from('games').then(games => {
                res.json({
                    platforms: platforms,
                    trainers: trainers,
                    games: games,
                    csrf: req.csrfToken()
                });
            });
        });
    });
});

router.post('/create', (req, res) => {
    var appid = req.body.title_search.split('-')[1].trim();
    db('trainers').select().where('tappid', appid).then(trainer => {
        if ( trainer.length > 0) {
            console.log(trainer);
        }
    });
});

module.exports = router;