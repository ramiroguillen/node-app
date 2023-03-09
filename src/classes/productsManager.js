const fs = require("fs/promises");

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    try {
      this.products = await this.getProducts();
      const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
      this.products.push({ id, ...product });
      return await fs.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log("* ~ file: productManager.js:16 ~ ProductManager ~ addProduct ~ error:", error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path);
      return JSON.parse(data);
    } catch (error) {
      console.log("* ~ file: productManager.js:25 ~ ProductManager ~ getProducts ~ error:", error);
    }
  }

  async getProductById(id) {
    try {
      this.products = await this.getProducts();
      return this.products.find((product) => product.id === id);
    } catch (error) {
      console.log("* ~ file: productManager.js:34 ~ ProductManager ~ getProductById ~ error:", error);
    }
  }

  async updateProduct(id, update) {
    try {
      this.products = await this.getProducts();
      let product = await this.getProductById(id);

      if (!product) return product;

      const productId = this.products.findIndex((product) => product.id === id);
      this.products[productId] = { ...product, ...update };
      return await fs.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log("* ~ file: productManager.js:49 ~ ProductManager ~ updateProduct ~ error:", error);
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProducts();
      const filteredProducts = products.filter((products) => products.id !== id);
      fs.writeFile(this.path, JSON.stringify(filteredProducts), "utf-8");
    } catch (error) {
      console.log("* ~ file: productManager.js:59 ~ ProductManager ~ deleteProductById ~ error:", error);
    }
  }
}

module.exports = ProductsManager;
