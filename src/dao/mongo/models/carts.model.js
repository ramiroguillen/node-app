const mongoose = require("mongoose");

const collectionName = "Carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array
    },
});

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;