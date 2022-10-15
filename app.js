const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const host = 3000;

app.use(cors());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//=========================================================================================================================
mongoose.connect(
  "mongodb+srv://tarebo:1@tarebo.tceymdv.mongodb.net/Tarebo?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

//=========================================================================================================================
require("./model/user");
require("./model/trip");
require("./model/plan");
require("./model/todo");
require("./model/expense");
require("./model/review");

const user = require("./api/route/user_route");
const trip = require("./api/route/trip_route");
const plan = require("./api/route/plan_route");
const todo = require("./api/route/todo_route");
const expense = require("./api/route/expense_route");
const review = require("./api/route/review_route");
const auth = require("./auth");
const reqLogin = require("./middleware/requireLogin");

//=========================================================================================================================

//parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.use("/auth", auth);
app.use("/token", reqLogin);
app.use("/user", user);
app.use("/trip", trip);
app.use("/plan", plan);
app.use("/todo", todo);
app.use("/expense", expense);
app.use("/review", review);

app.listen(host, () => {
  console.log("Server is listening...");
});
