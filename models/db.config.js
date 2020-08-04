const env = require("dotenv").config();
const mongoose = require("mongoose");

let url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
