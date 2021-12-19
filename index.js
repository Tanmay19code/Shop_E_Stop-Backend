const connectToMongoose = require("./db");

const express = require("express");

connectToMongoose();

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/authentication/auth.js"));
app.use("/api/product", require("./routes/product/product.js"))

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
