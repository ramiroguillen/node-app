const mongoose = require("mongoose");

const collectionName = "Carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array
    },
});

const productsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;