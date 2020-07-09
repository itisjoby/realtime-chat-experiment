var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

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

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save(err => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

io.on("connection", () => {
  console.log("a user is connected");
});

var server = http.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
