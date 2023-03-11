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
    // Insert Products
    this.router.get(`${this.path}/insert`, async (req, res) => {
      try {
        const products = await this.productsManager.insertProducts();
        res.status(200).json({
          message: "Products inserted successfully",
          products,
        });
      } catch (error) {
        console.log("* ~ file: products.routes.js:29 ~ Insert Products Data ~ error:", error);
      }
    })

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
    this.router.post(`${this.path}`, uploader.single("thumbnail"), async (req, res) => {
      const { title, description, code, price, status, stock, category, thumbnail } = req.body;
      const product = req.body;

      // const file = req.file;

      // if (!file) {
      //   return res.status(400).send({ message: "Cannot process files" });
      // }

      // product.thumbnail = `http://localhost:5000/public/uploads/${file.originalname}`;

      if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
        return res.status(400).json({ message: "All product fields are mandatory" });
      }

      const result = await this.productsManager.addProduct(product);

      if (!result) {
        res.status(405).json({ message: `Product with ${code} already exists` })
      }
      return res.status(200).json({ product });
    }
    );

    // Update Product By Id
    this.router.put(`${this.path}/:pid`, async (req, res) => {
      const pid = req.params.pid;
      const product = await this.productsManager.updateProduct(pid, req.body);

      if (!product) {
        return res.status(200).json({ message: `Product ${pid} Not Found`, });
      }

      return res.status(200).json({ product });
    });

    // Delete Product By Id
    this.router.delete(`${this.path}/:pid`, async (req, res) => {
      const pid = req.params.pid;
      await this.productsManager.deleteProductById(pid);
      return res.status(200).json({ message: "Product deleted successfully" });
    });
  }
}

module.exports = ProductsRoutes;
