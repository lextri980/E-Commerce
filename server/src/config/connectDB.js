const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@e-commerce-shopoo.dd8ol.mongodb.net/eCommerce?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
    console.log("Fail to connect!");
  }
}

module.exports = { connect };
