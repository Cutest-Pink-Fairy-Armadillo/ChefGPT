const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const controller = require("./controller/controller.js");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://user:0kEQi1FIS0hB8qqs@cluster0.qpvqivt.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "users",
    }
  )
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/user", controller.generateUser, (req, res) => {
  res.status(200);
});

app.use("*", (req, res) => res.status(404).json("Invalid request"));

app.use((err, req, res, next) => {
  const defaultError = {
    log: "Uncaught Express middleware error has occured",
    status: 500,
    message: "An unknown error has occurred",
  };
  const errorObj = Object.assign({}, defaultError, err);

  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  return console.log("\x1b[36m%s\x1b[0m", `Server listening at port: ${PORT}`);
});
