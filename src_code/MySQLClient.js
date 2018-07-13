var mysql = require("mysql");
var config = require("../config.js");

var pool = mysql.createPool(config.MYSQL_CREDENTIALS);

exports.getConnection = function(callback) {
    pool.getConnection((err, connection) => {
        callback(err, connection);
    });
};

process.on("SIGINT", function () {
    pool.end((err) => {
        if (err) console.error(err);
        else console.log("Closed MySQL pools");
        process.exit(0);
    });
});