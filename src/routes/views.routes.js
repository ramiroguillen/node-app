const { Router } = require("express");

class ViewsRoutes {
    path = "/views";
    router = Router();

    constructor() {
        this.initBaseRoutes();
    }

    /* initBaseRoutes */
    initBaseRoutes() {
        // Render Products View
        this.router.get(`${this.path}/products`, async (req, res) => {
            const products = [];
            res.render("products", { products });
        });
        // Render Chat View
        this.router.get(`${this.path}/chat`, async (req, res) => {
            const chat = [];
            res.render("chat", { chat })
        });
    }
}

module.exports = ViewsRoutes;