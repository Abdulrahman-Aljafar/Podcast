const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ConfirmPassword:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
    },

    bio: {
        type: String,
    },
    subscribe: Array,
    Mysubscribe: Array,


}, { timestamps: true });



var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;
