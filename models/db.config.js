const env = require("dotenv").config();
const mongoose = require("mongoose");

let url = process.env.MONGO_URL.replace("***", "mainProject");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
