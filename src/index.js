const App = require("./app");
const BaseRoutes = require("./routes/base.routes");
const ProductsRoutes = require("./routes/products.routes");
const CartsRoutes = require("./routes/carts.routes");
const ChatRoutes = require("./routes/chat.routes");

const app = new App([
    new BaseRoutes(),
    new ProductsRoutes(),
    new CartsRoutes(),
    new ChatRoutes(),
]);

app.listen();