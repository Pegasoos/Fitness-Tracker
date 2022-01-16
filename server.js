const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const routes = require('./controllers');

PORT = process.env.PORT || 3003;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended:true} ));
app.use(express.json());

app.use(express.static("public"));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

app.listen(PORT, () =>{
    console.log(`App listening at http://localhost:${PORT}`)
});