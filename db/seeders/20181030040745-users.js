'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            username: 'Admin',
            password: 'admin123',
            role: 1,
            steamid: 12345678901234567,
            chlink: 'https://www.cheathappens.com/user_profile.asp?userID=1171981'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
