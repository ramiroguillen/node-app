const fs = require("fs/promises");
const productsModel = require("../dao/mongo/models/products.model");
const productsData = require("../utils/data/products.data")

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async insertProducts() {
    try {
      await productsModel.insertMany(productsData);
      return productsData;
    } catch (error) {
      console.log("* ~ file: products.routes.js:15 ~ Insert Products Data ~ error:", error);
    }
  }

  async addProduct(product) {
    try {
      // this.products = await this.getProducts();
      // const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
      // this.products.push({ product });
      // return await fs.writeFile(this.path, JSON.stringify(this.products));
      const productDetails = await productsModel.findOne({
        code: product.code
      });

      if (productDetails && Object.keys(productDetails).length !== 0) {
        return false;
      }

      await productsModel.create(product);
      return product
    } catch (error) {
      console.log("* ~ file: products.manager.js:28 ~ ProductManager ~ addProduct ~ error:", error);
    }
  }

  async getProducts() {
    try {
      // const data = await fs.readFile(this.path);
      // return JSON.parse(data);
      const productsList = await productsModel.find();
      return productsList;
    } catch (error) {
      console.log("* ~ file: products.manager.js:39 ~ ProductManager ~ getProducts ~ error:", error);
    }
  }

  async getProductById(id) {
    try {
      // this.products = await this.getProducts();
      // return this.products.find((product) => product._id === id);
      const product = await productsModel.findOne({ _id: id });
      return product;
    } catch (error) {
      console.log("* ~ file: products.manager.js:50 ~ ProductManager ~ getProductById ~ error:", error);
    }
  }

  async updateProduct(id, update) {
    try {
      // this.products = await this.getProducts();
      // const product = await this.getProductById(id);

      // if (!product) return product;

      // const productId = this.products.findIndex((product) => product.id === id);
      // this.products[productId] = { ...product, ...update };
      // return await fs.writeFile(this.path, JSON.stringify(this.products));
      const product = this.getProductById(id);

      return product;
    } catch (error) {
      console.log("* ~ file: products.manager.js:49 ~ ProductManager ~ updateProduct ~ error:", error);
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProducts();
      const filteredProducts = products.filter((products) => products.id !== id);
      fs.writeFile(this.path, JSON.stringify(filteredProducts), "utf-8");
    } catch (error) {
      console.log("* ~ file: products.manager.js:59 ~ ProductManager ~ deleteProductById ~ error:", error);
    }
  }
}

module.exports = ProductsManager;
