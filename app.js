const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const host = 3000;

require('./model/user')
require('./model/trip')
require('./model/plan')
require('./model/todo')
require('./model/expense')

const user = require("./api/route/user_route");

//parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.use("/", user);



mongoose.connect("mongodb+srv://tarebo:1@tarebo.tceymdv.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on('connected', () => {
    console.log("connected to mongodb")
})
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
})

app.listen(host, () => {
  console.log("Server is listening on port 3000...");
});
