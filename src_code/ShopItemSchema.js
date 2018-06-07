/**
 * @description Prepare a model for representing sellable items in the database.
 */

var mongoose = require('mongoose');

/**
 * Tips from MDN:
 * 
 * Each model maps to a collection of documents in the MongoDB database. 
 * The documents will contain the fields/schema types defined in the model 
 * Schema.
 * 
 */
var shopItemSchema = new mongoose.Schema({
        title: String,
        description: String,
        categories: {
            type: String,
            lowercase: true,
            trim: true
        },
        price: Number,
        quantity_in_stock: Number,
        total_inventory: Number,
        currency: String,
        image_urls: Array,
        weekly_rental_price: Number
    }, 
    {
        timestamps: false,
        autoIndex: false,
        collection: "applicants_254_shop"
    }
);

shopItemSchema.virtual("url").get(function () {
    return "/shop/item/" + this._id;
});

/*
 * The schema has now been compiled into a mongoose model. I can now use it
 * find, create, update and delete objects of the shopItem type.
 * 
 * Also, Every model has an associated connection (this will be the default 
 * connection when you use mongoose.model()). 
 * You create a new connection and call .model() on it to create the 
 * documents on a different database.
 * 
 */ 
module.exports = mongoose.model('shopItem', shopItemSchema);
