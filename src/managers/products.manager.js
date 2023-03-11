const productsModel = require("../dao/mongo/models/products.model");
const productsData = require("../utils/data/products.data")

class ProductsManager {

  async insertProducts() {
    try {
      await productsModel.insertMany(productsData);
      return productsData;
    } catch (error) {
      console.log("* ~ file: products.routes.js:16 ~ Insert Products Data ~ error:", error);
    }
  }

  async addProduct(product) {
    try {
      const productDetails = await productsModel.findOne({
        code: product.code
      });

      if (productDetails && Object.keys(productDetails).length !== 0) {
        return false;
      }

      await productsModel.create(product);
      return product
    } catch (error) {
      console.log("* ~ file: products.manager.js:33 ~ ProductManager ~ addProduct ~ error:", error);
    }
  }

  async getProducts() {
    try {
      const productsList = await productsModel.find();
      return productsList;
    } catch (error) {
      console.log("* ~ file: products.manager.js:42 ~ ProductManager ~ getProducts ~ error:", error);
    }
  }

  async getProductById(id) {
    try {
      const product = await productsModel.findOne({ _id: id });
      return product;
    } catch (error) {
      console.log("* ~ file: products.manager.js:51 ~ ProductManager ~ getProductById ~ error:", error);
    }
  }

  async updateProduct(id, update) {
    try {
      const product = await productsModel.replaceOne({ _id: id }, update)
      return product;
    } catch (error) {
      console.log("* ~ file: products.manager.js:60 ~ ProductManager ~ updateProduct ~ error:", error);
    }
  }

  async deleteProductById(id) {
    try {
      await productsModel.findOneAndRemove({ _id: id })
      return id;
    } catch (error) {
      console.log("* ~ file: products.manager.js:69 ~ ProductManager ~ deleteProductById ~ error:", error);
    }
  }
}

module.exports = ProductsManager;
