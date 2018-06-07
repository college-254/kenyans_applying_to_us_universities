/**
 * @description Prepare a model for representing users in the database.
 * 
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        salt: Array,
        hash: Array,
        userIDInApp: {
            type: Number,
            unique: true
        },
        email_address: {
            type: String,
            required: true,
            unique: [true, "This email address is already taken"]
        },
        reputation: Number,
        account_type: String,
        mentees: Array,
        mentors: Array,
        validated: Boolean,
        preferred_contacts: String,
        profile_pic: String,
        university: String,
        bio: String
    },
    {
        timestamps: false,
        autoIndex: false,
        collection: "applicants_254_users"
    }
);

userSchema.virtual("url").get(function() {
    return "/applicants-254/user/" + this._id;
});

module.exports = mongoose.model('User', userSchema);
