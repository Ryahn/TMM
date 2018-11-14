const
    db = require('../db/init'),
    User = db.users;
    moment = require('moment'),
    bcrypt = require('bcrypt')
    ;

class UsersController {

    /*
    * Index to list all users
    * @param {*} req
    * @param {*} res
    */
    index(req, res) {
        User.findAll().then(
            users => {
                res.render('user/index', { users: users, csrf: req.csrfToken() });
                // console.log(users);
            }
        );
    }

    /*
    * Create (store) new user
    * @param {*} req
    * @param {*} res
    */
    store(req, res) {
        let userData = {};
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.create_password, salt);

        userData.push({
            username: req.body.username,
            password: hash,
            chlink: req.body.chlink,
            role: parseInt(req.body.create_role),
            steamid: parseInt(req.body.create_steamid),
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        User.create(userData).then(
            user => {
                req.flash('success', 'User created');
                res.redirect('index');
            }
        );
    }

    /*
    * Edit user by given ID
    * @param {*} req
    * @param {*} res
    */
    edit(req, res) {
        let id = req.params.id;
        User.findByPk(id).then(
            user => {
                res.send({ user: user, roles: [1,2,5,4,5], csrf: req.csrfToken() });
            }
        );
    }

    /*
    * Update user by ID
    * @param {*} req
    * @param {*} res
    */
    update(req, res) {
        let id = req.body.id;
        let userData = {};

        if (req.body.password) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt);
            userData.password = hash;
        }

        if (req.body.steamid) {
            userData.steamid = req.body.steamid;
        }

        if (user[0].username !== req.body.username) {
            userData.username = req.body.username;
        }

        if (user[0].role !== parseInt(req.body.role)) {
            userData.role = parseInt(req.body.role);
        }

        if (JSON.stringify(userData) === '{}') {
            return;
        }

        userData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        User.update(userData, { where: { id } }).then(
            user => {
                req.flash('success', 'User has been updated');
                res.json(user);
            }
        ).catch(
            err => {
                req.flash('danger', 'Could not update user');
                res.json(err);
            }
        );
    }

    /*
    * Delete user by ID
    * @param {*} req
    * @param {*} res
    */
    delete(req, res) {
        let id = req.body.id;
        User.destroy({ where: { id } }).then(
            (data) => {
                req.flash('success', 'User has been deleted permanently');
                res.json(data);
            }
        ).catch(
            err => {
                req.flash('danger', 'Not able to delete user' + err);
                res.json(err);
            }
        );
    }

    profile(req, res) {
        let id = req.params.id;
        User.findById(id).then(
            user => {
                res.render('user/profile', {user: user, csrf: req.csrfToken()});
            }
        );
    }
}

module.exports = UsersController;