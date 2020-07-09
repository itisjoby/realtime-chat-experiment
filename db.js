const mongoose = require("mongoose");

const MONGO_USERNAME = "root";
const MONGO_PASSWORD = "redhat";
const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = "27017";
const MONGO_DB = "chat_test";

const url =
  "mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin";

mongoose.connect("mongodb://localhost/chat_test", { useNewUrlParser: true });
var Message = mongoose.model("Message", { name: String, message: String });
//mongoose.connect(url, { useNewUrlParser: true });
/*mongoose.connect(url, { useNewUrlParser: true }, err => {
  console.log("mongodb connected", err);
});*/
