const userRouter = require("./userRoute");
const orderRouter = require("./orderRoute");
const productRouter = require("./productRoute");
const authRouter = require("./authRoute");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
}

module.exports = route;
