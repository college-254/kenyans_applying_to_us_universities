var ShopItem = require('./ShopItemSchema.js');
var config = require('../config.js');
var mongoose = require('mongoose');
var MetadataDB = require('./MetadataMongoDB');

var debug = false;

/**
 * Create a new shop_item.
 * 
 * @param {JSON} payshop_item_json Expected keys: `title`, `description`,
 * `tags`, `createdById`, `urgency`, and `idInApp`
 * @param {Function} callBack Takes a JSON with `success`, 
 * `internal_error` and `message` as keys.
 */
exports.create = function (shop_item_json, callBack) {
    var shop_item = new ShopItem({
        title: shop_item_json.title,
        description: shop_item_json.description,
        categories: shop_item_json.categories,
        price: shop_item_json.price,
        quantity_in_stock: shop_item_json.quantity_in_stock,
        total_inventory: shop_item_json.total_inventory,
        currency: shop_item_json.currency,
        image_urls: shop_item_json.image_urls,
        weekly_rental_price: shop_item_json.weekly_rental_price
    });

    shop_item.save(function(error, saved_shop_item) {
        if (error) {
            callBack({
                "success": false, "internal_error": true,
                "message": error
            });
        } else {
            callBack({
                "success": false, "internal_error": false,
                "message": saved_shop_item
            });
        }
    });
};

/**
 * Read a shop_item(s) from the database.
 * 
 * @param {JSON} payload Must contain `userIDInApp` as one of the keys.
 * If `_id` is not one of the keys, fetch all the user's cards.
 * @param {Function} callBack Takes a JSON with `success`, `internal_error` 
 * and `message` as keys.
 */
exports.read = function(query, callBack) {

    var cursor = ShopItem.find(query).cursor();
    var allRelevantItems = [];
    cursor.on("data", (shop_item) => {
        allRelevantItems.push(shop_item);
    });
    cursor.on("close", () => {
        callBack({
            "success": true, "internal_error": false,
            "message": allRelevantItems
        });
    });
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
    var _id = shop_item_JSON._id;

    // findByIdAndUpdate will give me the old, not the updated, document.
    // I need to find the shop_item, save it, and then call MetadataDB.update if need be

    ShopItem.findById(_id, function(error, shop_item) {
        if (error) {
            callBack({
                "success": false, "internal_error": true,
                "message": error
            });
        } else {
            // Overwrite the contents that changed
            Object.keys(shop_item_JSON).forEach(item_key => {
                shop_item[item_key] = shop_item_JSON[item_key];
            });
            shop_item.save(function(error, saved_shop_item) {
                if (error) {
                    callBack({
                        "success": false, "internal_error": true,
                        "message": error
                    });
                } else {
                    callBack({
                        "success": true, "internal_error": false,
                        "message": saved_shop_item
                    });
                }
            });
        }
    });
};

/**
 * Remove this shop_item from the database.
 * 
 * @param {JSON} shop_item_json The shop_item to be removed
 * @param {Function} callBack Takes a JSON with `success`,
 * `internal_error` and `message` as keys.
 */
exports.delete = function (shop_item_json, callBack) {
    ShopItem.findByIdAndRemove(
        shop_item_json._id, (error, removed_shop_item) => {
        if (error) {
            callBack({
                "success": false, "internal_error": true,
                "message": error
            });
        } else {
            callBack({
                "success": true, "internal_error": false,
                "message": removed_shop_item
            });
        }
    });
};
