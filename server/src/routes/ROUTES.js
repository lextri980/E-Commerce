const userRouter = require("./user.route");
const orderRouter = require("./order.route");
const productRouter = require("./product.route");
const authRouter = require("./auth.route");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
}

module.exports = route;
