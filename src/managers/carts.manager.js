const ProductsManager = require("./products.manager");
const cartsModel = require("../dao/mongo/models/carts.model");
const cartsData = require("../utils/data/carts.data");

class CartsManager {
  productsManager = new ProductsManager();

  async insertCarts() {
    try {
      await cartsModel.insertMany(cartsData);
      return cartsData;
    } catch (error) {
      console.log("* ~ file: carts.manager.js:13 ~ CartsManager ~ Insert Carts Data ~ error:", error);
    }
  }

  async addCart() {
    try {
      await cartsModel.create(cart);
      return cart
    } catch (error) {
      console.log("* ~ file: carts.manager.js:30 ~ CartsManager ~ addCart ~ error:", error);
    }
  }

  async getCarts() {
    try {
      return JSON.parse(await fs.readFile(this.path));
    } catch (error) {
      console.log("* ~ file: carts.manager.js:30 ~ CartsManager ~ getCarts ~ error:", error);
    }
  }

  async getProductsByCartId(id) {
    try {
      const cart = cartsModel.findOne({ _id: id });
      return cart;
    } catch (error) {
      console.log("* ~ file: carts.manager.js:39 ~ CartsManager ~ getProductsByCartId ~ error:", error);
    }
  }
  // TODO
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
      console.log("* ~ file: carts.manager.js:58 ~ CartsManager ~ getProductsByCartId ~ error:", error);
    }
  }
}

module.exports = CartsManager;
