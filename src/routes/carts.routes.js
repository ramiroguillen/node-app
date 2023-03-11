const { Router } = require("express");
const CartsManager = require("../managers/carts.manager");

class CartsRoutes {
  path = "/carts";
  router = Router();
  cartsManager = new CartsManager();

  constructor() {
    this.initCartsRoutes();
  }

  initCartsRoutes() {

    // Insert Cart
    this.router.get(`${this.path}/insert`, async (req, res) => {
      const carts = await this.cartsManager.insertCarts();
      res.status(200).json({
        message: "Products inserted successfully",
        carts,
      })
    });
    // Create Cart
    this.router.post(`${this.path}/`, async (req, res) => {
      await this.cartsManager.addCart();
      return res.status(200).json({ message: "New Cart created" });
    });

    // Get Cart Products By Cart Id
    this.router.get(`${this.path}/:cid`, async (req, res) => {
      const products = await this.cartsManager.getProductsByCartId(req.params.cid);

      if (!products) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.status(200).json({ message: `Cart ${cid}`, products });
    });

    // Add Product to Cart
    this.router.post(`${this.path}/:cid/products/:pid`, async (req, res) => {
      const { cid, pid } = req.params;
      await this.cartsManager.addProductToCart(cid, pid);
      return res.status(200).json({ message: `Product: ${pid} added to Cart: ${cid}` });
    });
  }
}

module.exports = CartsRoutes;
