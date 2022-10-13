const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv")
dotenv.config()

let _database;


const initDatabase = (callback) => {
    if (_database) {
        console.log('Database is already initialized');
        return callback(null, _database);
    }
    MongoClient.connect(process.env.MONGODB_URI).then((client) => {
        _database = client;
        callback(null, _database);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDatabase = () => {
    if (!_database) {
        throw Error('Database is not initialized');
    }
    return _database;
};


module.exports = { initDatabase, getDatabase }