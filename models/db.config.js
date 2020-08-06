const env = require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URL);
let url = process.env.MONGO_URL.replace("***", "mainProject");
console.log(url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
