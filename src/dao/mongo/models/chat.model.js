const mongoose = require("mongoose");

const collectionName = "Chat";

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

const productsModel = mongoose.model(collectionName, chatSchema);
module.exports = cartsModel;