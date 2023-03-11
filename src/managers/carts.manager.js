const fs = require("fs/promises");
const ProductsManager = require("./products.manager");
const path = require("path");

const productsDbPath = path.join(__dirname, "./db/local/products.json");

class CartsManager {
  productsManager = new ProductsManager(productsDbPath);

  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async addCart() {
    try {
      this.carts = await this.getCarts();
      const id = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
      this.carts.push({ id, products: [] });
      return await fs.writeFile(this.path, JSON.stringify(this.carts));
    } catch (error) {
      console.log("* ~ file: cartManager.js:22 ~ CartsManager ~ addCart ~ error:", error);
    }
  }

  async getCarts() {
    try {
      return JSON.parse(await fs.readFile(this.path));
    } catch (error) {
      console.log("* ~ file: cartManager.js:30 ~ CartsManager ~ getCarts ~ error:", error);
    }
  }

  async getProductsByCartId(id) {
    try {
      this.carts = await this.getCarts();
      return this.carts.find((cart) => cart.id === id).products;
    } catch (error) {
      console.log("* ~ file: cartManager.js:39 ~ CartsManager ~ getProductsByCartId ~ error:", error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const product = await this.productsManager.getProductById(pid);
      const cart = await this.getProductsByCartId(cid);

      // TODO: ADD THE POSSIBILITY OF ADDING SEVERAL PRODUCTS OF THE SAME TYPE AT ONCE
      
      if (cart.some((item) => item.product === product.id)) {
        const index = cart.findIndex((item) => item.product === product.id);
        cart[index].quantity++;
      } else {
        cart.push({ product: product.id, quantity: 1 });
      }
      return await fs.writeFile(this.path, JSON.stringify(this.carts));
    } catch (error) {
      console.log("* ~ file: cartManager.js:56 ~ CartsManager ~ getProductsByCartId ~ error:", error);
    }
  }
}

module.exports = CartsManager;
