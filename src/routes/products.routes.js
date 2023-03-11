const { Router } = require("express");
const ProductsManager = require("../managers/products.manager");
const { uploader } = require("../utils/uploader");
const path = require("path");

const productsDbPath = path.join(__dirname, "../db/local/products.json");

class ProductsRoutes {
  path = "/products";
  router = Router();
  productsManager = new ProductsManager(productsDbPath);

  constructor() {
    this.initProductRoutes();
  }

  initProductRoutes() {
    // Get Products
    this.router.get(`${this.path}`, async (req, res) => {
      const limit = Number(req.query.limit);
      const products = await this.productsManager.getProducts();

      if (limit || limit >= products.length) {
        return res.status(200).json({
          products: products.slice(0, limit ? limit : products.length),
          message: `Getting all products, be carefull with your ${limit}`,
        });
      }

      return res.status(200).json({ products, message: "SUCCESS" });
    });

    // Get Product By Id
    this.router.get(`${this.path}/:pid`, async (req, res) => {
      const id = Number(req.params.pid);
      const product = await this.productsManager.getProductById(id);

      if (!product) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      return res.status(200).json({ product, message: "SUCCESS" });
    });

    // Create New Product
    this.router.post(`${this.path}`, uploader.single("thumbnail"), async (req, res) => {
      const { title, description, code, price, stock, category } = req.body;
      const product = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).send({ message: "Cannot process files" });
      }

      product.thumbnail = `http://localhost:5000/public/uploads/${file.originalname}`;

      if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: "All product files are mandatory" });
      }

      await this.productsManager.addProduct(product);
      return res.status(200).json({ message: "SUCCESS", product });
    }
    );

    // Update Product By Id
    this.router.put(`${this.path}/:pid`, async (req, res) => {
      const pid = Number(req.params.pid);
      const product = await this.productsManager.updateProduct(pid, req.body);

      if (!product) {
        return res.status(200).json({ message: `product ${pid} does not exist`, });
      }

      return res.status(200).json({ message: "SUCCESS" });
    });

    // Delete Product By Id
    this.router.delete(`${this.path}/:pid`, async (req, res) => {
      const pid = Number(req.params.pid);
      await this.productsManager.deleteProductById(pid);
      return res.status(200).json({ message: "SUCCESS" });
    });
  }
}

module.exports = ProductsRoutes;
