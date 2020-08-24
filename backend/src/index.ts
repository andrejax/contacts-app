import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import auth from "./api/auth";
import contacts from "./api/contacts";

import models from "./models";
models();

// Set up mongoose connection
import mongoose from "mongoose";
import config from "./config";

const mongoDB = config.mongoDb;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
// tslint:disable-next-line:no-console
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(cors());
app.use(bodyParser.json());
contacts(app);
auth(app);

app.listen(config.port, () => {
     // tslint:disable-next-line:no-console
    console.log("Server is up and running on port numner " + config.port);
});
