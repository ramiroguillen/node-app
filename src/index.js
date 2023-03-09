const App = require("./app");
const BaseRoutes = require("./routes/base.routes");
const ProductsRoutes = require("./routes/products.routes");
const CartsRoutes = require("./routes/carts.routes");

const app = new App([
    new BaseRoutes(),
    new ProductsRoutes(),
    new CartsRoutes()
]);

app.listen();