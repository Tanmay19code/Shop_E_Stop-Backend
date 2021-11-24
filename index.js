const connectToMongoose = require("./db");

const express = require("express");

connectToMongoose();

const app = express();
const port = 5000;

app.use(express.json());

app.use('/auth',require('./routes/auth.js'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});