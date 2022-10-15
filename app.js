const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require('cors')
const host = 3000;

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

const user = require("./api/route/user_route");
const trip = require("./api/route/trip_route");
const plan = require("./api/route/plan_route");
const todo = require("./api/route/todo_route");
const expense = require("./api/route/expense_route");
const auth = require("./auth");

//=========================================================================================================================

//parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.use(cors())

app.use("/", user);
app.use("/", trip);
app.use("/", plan);
app.use("/", todo);
app.use("/", expense);
app.use("/", auth);

app.listen(host, () => {
  console.log("Server is listening on port 3000...");
});
