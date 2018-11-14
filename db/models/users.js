'use strict';
const
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt'))
    ;
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        role: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            validate: {
                isNumeric: true
            }
        },
        steamid: {
            type: DataTypes.STRING(17),
            validate: {
                len: 17
            }
        },
        chlink: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        last_login: DataTypes.DATE
    }, 
    {
        hooks: {
            
            beforeCreate: function(user, options) {
                if (!user.changed('password')) {
                    return sequelize.Promise.reject('not modified');
                }

                return bcrypt.hash(user.password, 10).then(hash => {
                    return user.password = hash;
                }).catch(err => {
                    return sequelize.Promise.reject(err);
                });
            },
            
            beforeUpdate: function(user, options) {
                if (!user.changed('password')) {
                    return sequelize.Promise.reject('not modified');
                }

                return bcrypt.hash(user.password, 10).then(hash => {
                    return user.password = hash;
                }).catch(err => {
                    return sequelize.Promise.reject(err);
                });
            }
        },
        instanceMethods: {
            validPassword: function (password) {
                bcrypt.compare(password, this.password).then(res => {
                    return res;
                });
            }
        }

    });
    users.sync({force: false}).then(() => {
        return users.findOrCreate({
            where: {
                id: 1,
                username: 'Admin'
            },
            defaults: {
                username: 'Admin',
                password: 'admin123',
                role: 1,
                steamid: parseInt(12345678901234567),
                chlink: 'https://www.cheathappens.com/user_profile.asp?userID=1171981'
            }
        });
    });
    

    // users.associate = function (models) {
    //     // associations can be defined here
    // };
    return users;
};