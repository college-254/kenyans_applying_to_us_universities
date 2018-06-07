require("./MongooseClient.js");

var ShopItemsDB = require("./ShopItemsMongoDB.js");

/**
 * @description Create an item that can be treated as a shop item
 * 
 * @param {String} title The display name of the item
 * @param {String} description More info about the item
 * @param {String[]} categories Array of strings denoting categories that the item 
 * belongs to
 * @param {String} currency
 * @param {Number} price The price of the item
 * @param {Number} weekly_rental_price
 * @param {Number} quantity_in_stock The number of items that can be sold right
 * now
 * @param {Number} total_inventory The number of all items owned; equals the
 * quantity in stock plus those currently rented out
 * @param {String[]} image_urls An array of urls that hold images of the item
 * 
 */
var create_shop_item = function (title, description, categories, currency,
    price, weekly_rental_price, quantity_in_stock, total_inventory, image_urls) {
        return {
            title: title,
            description: description,
            categories: categories,
            currency: currency,
            price: price,
            weekly_rental_price: weekly_rental_price,
            quantity_in_stock: quantity_in_stock,
            total_inventory: total_inventory,
            image_urls: image_urls
        };
};

/**
 * @description Set up the first items in the shop.
 */
var initialize_shop = function() {
    var initial_shop_items = [
        create_shop_item(
            "Cracking the SAT: Chemistry, 15th Ed", "3 Practice Tests",
            "sat, chemistry", "KES", 3093, 257, 1, 1, 
            ["http://i.imgur.com/cnRP45L.jpg"]
        ),
        create_shop_item(
            "Barron's Physics, 2nd Ed", "4 Practice Tests",
            "sat, physics", "KES", 2663, 221, 1, 1,
            ["http://i.imgur.com/hMR6Cu8.jpg"]
        ),
        create_shop_item(
            "Cracking the SAT: Physics, 15th Ed", "2 Practice Tests",
            "sat, physics", "KES", 3503, 291, 1, 1,
            ["http://i.imgur.com/CeM8NLN.jpg"]
        ),
        create_shop_item(
            "Barron's New SAT", "5 Practice Tests & Vocab Review Cards",
            "sat, sat-reasoning", "KES", 2899, 212, 1, 1,
            ["http://i.imgur.com/5D7wxTq.gif"]
        ),
        create_shop_item(
            "Barron's Math Level 1, 6th Ed", "3 Practice Tests",
            "sat, math-level-1", "KES", 3031, 222, 1, 1,
            ["http://i.imgur.com/uWFjr9T.jpg"]
        ),
        create_shop_item(
            "Barron's Biology E/M, 5th Ed", "2 Practice Tests",
            "sat, biology", "KES", 2753, 229, 1, 1,
            ["http://i.imgur.com/YBkEiEZ.jpg"]
        ),
        create_shop_item(
            "Official SAT Study Guide", "8 Official Practice Tests",
            "sat, sat-reasoning", "KES", 4220, 309, 1, 1,
            ["http://i.imgur.com/gFkVms9.jpg"]
        ),
        create_shop_item(
            "The Princeton Review: Cracking the SAT", "4 Practice Tests",
            "sat, sat-reasoning", "KES", 4892, 358, 1, 1,
            ["http://i.imgur.com/727UhNH.jpg"]
        ),
        create_shop_item(
            "Cracking the SAT: Math Level 1", "2 Practice Tests",
            "sat, math-level-1", "KES", 3351, 245, 1, 1,
            ["http://i.imgur.com/Sb1gDB8.jpg"]
        ),
        create_shop_item(
            "Barron's Math Level 2, 12th Ed", "7 Practice Tests",
            "sat, math-level-2", "KES", 2858, 209, 1, 1,
            ["http://i.imgur.com/NI5BxdX.jpg"]
        ),
        create_shop_item(
            "Cracking the SAT: Math Level 2", "2 Practice Tests",
            "sat, math-level-2", "KES", 3090, 226, 1, 1,
            ["http://i.imgur.com/wSxqgoJ.jpg"]
        ),
        create_shop_item(
            "Barron's Chemistry, 13th Ed", "7 Practice Tests",
            "sat, chemistry", "KES", 2464, 205, 1, 1,
            ["http://i.imgur.com/acTOF2n.jpg"]
        ),
        create_shop_item(
            "Cracking the SAT: Biology E/M", "2 Practice Tests",
            "sat, biology-em", "KES", 2858, 209, 1, 1,
            ["http://i.imgur.com/ONYnUwl.jpg"]
        )
    ];
    for (let i = 0; i < initial_shop_items.length; i++) {
        ShopItemsDB.create(initial_shop_items[i], (result) => {
            if (!result.success) {
                console.log(`Error! ${result.success}`);
            } else {
                console.log(
                    `Saved ${result.message.title} as ${result.message._id}`
                );
            }
        });
    }
};

var delete_all_shop_items = function() {
    ShopItemsDB.read({}, (results) => {
        if (!results.success) throw(results.message);
        for (let i = 0; i < results.message.length; i++) {
            ShopItemsDB.delete(results.message[i], (delete_results) => {
                if (!delete_results.success) throw(delete_results.message);
                console.log(`Successfully deleted ${delete_results.message.title}`);
            });
        }
    });
};

if (require.main === module) {
    initialize_shop();
    // delete_all_shop_items();
}