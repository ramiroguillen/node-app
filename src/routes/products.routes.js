const { Router } = require("express");
const ProductsManager = require("../managers/products.manager");

class ProductsRoutes {
  path = "/products";
  router = Router();
  productsManager = new ProductsManager();

  constructor() {
    this.initProductRoutes();
  }

  initProductRoutes() {
    // Insert Products
    this.router.get(`${this.path}/insert`, async (req, res) => {
      const products = await this.productsManager.insertProducts();
      res.status(200).json({
        message: "Products inserted successfully",
        products,
      });
    });

    // Get Products
    this.router.get(`${this.path}`, async (req, res) => {
      const limit = Number(req.query.limit);
      const products = await this.productsManager.getProducts();

      if (!limit || limit >= products.length)
        return res.status(200).json({
          message: `Retrieving ${products.length} products.`,
          warning: `There is no limit or limit is bigger than the amount of products available. (Limit: ${limit})`,
          products,
        });

      return res.status(200).json({
        products: products.slice(0, limit),
      });
    });

    // Get Product By Id
    this.router.get(`${this.path}/:pid`, async (req, res) => {
      const id = req.params.pid;
      const product = await this.productsManager.getProductById(id);

      if (!product) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      return res.status(200).json({ product });
    });

    // Create New Product
    this.router.post(`${this.path}`, async (req, res) => {
      const { title, description, code, price, status, stock, category, thumbnail } = req.body;

      // * TODO: Move to middlewares -> 
      if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
        return res.status(400).json({ message: "All product fields are mandatory" });
      }
      // <- *
      const product = await this.productsManager.addProduct(req.body);

      if (!product) {
        res.status(405).json({ message: `Product with ${code} already exists` })
      }

      return res.status(200).json({ product });
    }
    );

    // Update Product By Id
    this.router.put(`${this.path}/:pid`, async (req, res) => {
      const pid = req.params.pid;
      const product = await this.productsManager.getProductById(pid);

      if (!product) {
        return res.status(404).json({ message: `Product ${pid} Not Found`, });
      }

      await this.productsManager.updateProduct(pid, req.body);
      return res.status(200).json({ message: `Product ${pid} updated successfully` });
    });

    // Delete Product By Id
    this.router.delete(`${this.path}/:pid`, async (req, res) => {
      const pid = req.params.pid;
      await this.productsManager.deleteProductById(pid);
      return res.status(200).json({ message: `Product ${pid} deleted successfully` });
    });
  }
}

module.exports = ProductsRoutes;
