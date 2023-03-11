const { Router } = require("express");
const CartsManager = require("../managers/carts.manager");
const path = require("path");

const cartsDbPath = path.join(__dirname, "../db/local/carts.json");

class CartsRoutes {
  path = "/cart";
  router = Router();
  cartsManager = new CartsManager(cartsDbPath);

  constructor() {
    this.initCartsRoutes();
  }

  initCartsRoutes() {
    // Create Cart
    this.router.post(`${this.path}/`, async (req, res) => {
      await this.cartsManager.addCart();
      return res.status(200).json({ message: "New Cart created" });
    });

    // Get Cart Products By Cart Id
    this.router.get(`${this.path}/:cid`, async (req, res) => {
      const cartId = Number(req.params.cid);
      const products = await this.cartsManager.getProductsByCartId(cartId);

      if (!products) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.status(200).json({ message: `Cart ${cid}`, products });
    });

    // Add Product to Cart
    this.router.post(`${this.path}/:cid/products/:pid`, async (req, res) => {
      const cartId = Number(req.params.cid);
      const productId = Number(req.params.pid);
      await this.cartsManager.addProductToCart(cartId, productId);
      return res.status(200).json({ message: `Product: ${productId} added to Cart: ${cartId}` });
    });
  }
}

module.exports = CartsRoutes;
