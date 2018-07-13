/**
 * @description Maintain the shop in a MySQL database.
 */

var mysql_client = require("./MySQLClient.js");
var debug = false;

initialize_shop = function() {

    /*
    var initialization_query = "CREATE TABLE shop_items (" +
        "id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY," +
        "title VARCHAR(255) NOT NULL, description TINYTEXT," +
        "price SMALLINT UNSIGNED NOT NULL, weekly_rental_price DECIMAL(8, 2) UNSIGNED," +
        "quantity_in_stock TINYINT UNSIGNED NOT NULL," +
        "total_inventory TINYINT UNSIGNED NOT NULL," +
        "currency VARCHAR(5) NOT NULL,image_urls TINYTEXT)";
    */

    // How to handle the category???
    var initialization_query = `
        CREATE TABLE IF NOT EXISTS shop_items (
            id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TINYTEXT,
            price SMALLINT UNSIGNED NOT NULL,
            weekly_rental_price DECIMAL(7, 2) UNSIGNED,
            quantity_in_stock TINYINT UNSIGNED NOT NULL,
            total_inventory TINYINT UNSIGNED NOT NULL,
            currency VARCHAR(5) NOT NULL,
            image_urls TINYTEXT
        ) 
        CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`;

    mysql_client.getConnection((err, connection) => {
        if (err) console.error(err);
        else {
            connection.query(
                "DROP TABLE IF EXISTS shop_items", 
                (err, res) => {
                    if (err) console.error(err);
                    else {
                        connection.query(
                            initialization_query,
                            (err, results, fields) => {
                                if (err) console.error(err);
                                else {
                                    console.log(results);
                                    console.log("_____");
                                    console.log(fields);
                                }
                            }
                        );
                    }
                }
            );
        }
    });
    
};

/**
 * Create a new shop_item.
 * 
 * @param {JSON} payshop_item_json Expected keys: `title`, `description`,
 * `tags`, `createdById`, `urgency`, and `idInApp`
 * @param {Function} callBack Takes a JSON with `success`, 
 * `internal_error` and `message` as keys.
 */
exports.create = function (shop_item_json, callBack) {
};

/**
 * Read a shop_item(s) from the database.
 * 
 * @param {JSON} payload Must contain `userIDInApp` as one of the keys.
 * If `_id` is not one of the keys, fetch all the user's cards.
 * @param {Function} callBack Takes a JSON with `success`, `internal_error` 
 * and `message` as keys.
 */
exports.read = function (query, callBack) {
};

/**
 * Update an existing shop_item.
 * 
 * @param {JSON} shop_item_JSON The parts of the shop_item that have been updated. Must
 * include the shop_item's `id`
 * @param {Function} callBack Takes a JSON with `success`,
 * `internal_error` and `message` as keys.
 */
exports.update = function (shop_item_JSON, callBack) {
};

/**
 * Remove this shop_item from the database.
 * 
 * @param {JSON} shop_item_json The shop_item to be removed
 * @param {Function} callBack Takes a JSON with `success`,
 * `internal_error` and `message` as keys.
 */
exports.delete = function (shop_item_json, callBack) {
};

if (require.main === module) {
    initialize_shop();
    // delete_all_shop_items();
}