const Sequelize = require('sequelize');

const { { music_library_api, root, Spiderkid2020!, localhost, 3307 } } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(music_library_mysql, root, Spiderkid2020!, {
        host: localhost,
        port: 3307,
        dialect: 'mysql',
        logging: false,
    });

    connection.sync({ alter: true });
    return {};
};

module.exports = setupDatabase();