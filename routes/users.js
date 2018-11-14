/*global db*/
const 
    router = require('express').Router(),
    UsersController = require('../controllers/users.controller'),
    controller = new UsersController()
    // moment = require('moment'),
    // bcrypt = require('bcrypt')
    ;

router.get('/', (req, res) => controller.index(req, res));
router.post('/create', (req, res) => controller.store(req, res));
router.get('/edit/:id', (req, res) => controller.edit(req, res));
router.post('/update', (req, res) => controller.update(req, res));
router.post('/delete', (req, res) => controller.update(req, res));
router.get('/:id', (req, res) => controller.profile(req, res));

// router.get('/', (req, res) => {
//     db.select('users.id', 'users.username', 'users.role', 'users.steamid', 'users.created_at', 'users.updated_at', 'users.lastLogin', 'users.chlink', 'roles.*').from('users').leftJoin('roles', 'users.role', 'roles.rid').then(rows => {
//         res.render('user/index', {
//             page: 'User List',
//             users: rows, 
//             moment: moment, 
//             csrf: req.csrfToken() 
//         });
//         // res.json(rows[0]);
//     });
// });

// router.post('/create', (req, res) => {
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync(req.body.create_password, salt);
//     let userData = {
//         username: req.body.create_username,
//         password: hash,
//         role: parseInt(req.body.create_role),
//         steamid: req.body.create_steamid,
//         chlink: req.body.create_chlink,
//         created_at: moment().format('YYYY-MM-DD HH:mm:ss')
//     };

//     db.insert(userData).into('users').then(data => {
//         req.flash('success', 'User created');
//         res.redirect('/users');
//     }).catch(err => {
//         req.flash('danger', 'Unable to create user' + err);
//         res.redirect('/users');
//     });
// });

// router.get('/edit/:id', (req, res) => {
//     db.select('users.id', 'users.username', 'users.updated_at', 'users.created_at', 'users.steamid', 'users.chlink', 'users.role', 'roles.rid', 'roles.rname').from('users').leftJoin('roles', 'users.role', 'roles.rid').where('users.id', req.params.id).then(user => {
//         db.select().from('roles').then(roles => {
//             res.send({ user: user, roles: roles, csrf: req.csrfToken() });
//         }).catch((err) => {
//             throw new Error('Could not fetch roles ' + err);
//         });
//     }).catch((err) => {
//         throw new Error('Could not find user with the id of ' + req.params.id + ' Error: ' + err);
//     });
// });

// router.post('/update', (req, res) => {
//     db.select().from('users').where('id', req.body.userid).then(user => {
//         let userData = {};

//         if (req.body.password) {
//             var salt = bcrypt.genSaltSync(10);
//             var hash = bcrypt.hashSync(req.body.password, salt);
//             userData.password = hash;
//         }

//         if (req.body.steamid) {
//             userData.steamid = req.body.steamid;
//         }

//         if (user[0].username !== req.body.username) {
//             userData.username = req.body.username;
//         }

//         if (user[0].role !== parseInt(req.body.role)) {
//             userData.role = parseInt(req.body.role);
//         }

//         if (JSON.stringify(userData) === '{}') {
//             return;
//         }

//         userData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

//         db('users').update(userData).where('id', req.body.userid).then(data => {
//             req.flash('success', 'User has been updated');
//             res.json(data);
//         })
//             .catch(err => {
//                 req.flash('danger', 'Could not update user');
//                 res.json(err);
//             });
//     });
// });

// router.post('/delete', (req, res) => {
//     db('users').where('id', req.body.id).delete().then(data => {
//         req.flash('success', 'User has been deleted permanently');
//         res.json(data);
//     }).catch(err => {
//         req.flash('danger', 'Not able to delete user' + err);

//     });
//     // console.log(req.body.id);
// });

// router.get('/roles', (req, res) => {
//     db.select().from('roles').then(roles => {
//         res.send({roles: roles, csrf: req.csrfToken() });
//     });
// });

module.exports = router;