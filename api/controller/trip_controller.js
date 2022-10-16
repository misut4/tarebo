const { default: mongoose } = require("mongoose");
const user = require("../../model/user");
// const Trip = mongoose.model("Trip");
const Trip = require("../../model/trip");
const Todo = require("../../model/todo");
const Expense = require("../../model/expense");
const Plan = require("../../model/plan");
const { ObjectId } = require("mongodb");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, _id) {
  const [listPlan, listTodo, listExpense] = await Promise.all([
    Plan.find({
      belongTo: _id,
    }).exec(),
    Todo.find({
      belongTo: _id,
    }).exec(),
    Expense.find({
      belongTo: _id,
    }).exec(),
  ]);

  res
    .status(200)
    .json({ msg: "success", code: 200, listPlan, listTodo, listExpense });
}

async function findMany(req, res) {
  const listTrip = await Trip.find().exec()
  
  res.status(200).json({
    msg: "success",
    listTrip
  })
}

async function findByUserId(req, res) {
  const listTrip = await Trip.find({
    belongTo: req.body._id
  })
  
  res.status(200).json({
    msg: "success",
    listTrip
  })
}



async function createOne(req, res) {
  const title = req.body.title;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const createDate = req.body.createDate;

  const count = await checkCount(req, res);
  console.log(count);
  console.log(req.user.isPremium);

  if (count > 2 && req.user.isPremium != true) {
    res
      .status(200)
      .json({ msg: "Only Premium members can create more than 2 trips" });
  } else {
    const trip = new Trip({
      //key and value are the same so only need to type one
      title,
      startDate,
      endDate,
      createDate,
      belongTo: req.user._id,
    });
    trip
      .save()
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function updateOne(req, res) {
  const title = req.body.title;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const createDate = req.body.createDate;

  // if (!email || !username || !password) {
  //     res.status(422).json({ error: "Please add all the fields" })
  // }
  //make password not show on database
  // req.user.password = undefined
  const trip = new Trip({
    //key and value are the same so only need to type one
    title,
    startDate,
    endDate,
    createDate,
  });
  trip
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteOne(req, res) {
  try {
    await Trip.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch {
    res.status(200);
    res.send({ msg: "Trip doesn't exist!", code: "400" });
  }
}

async function checkCount(req, res) {
  const count =
    (await Trip.collection.countDocuments({
      belongTo: req.user._id,
    })) + 1;
  return count;
}

//=====================================================================================

//REST API GET=================================================
const getTrip = (req, res) => {
  const _id = req.body;
  findOne(req, res, _id);
};

const getAllTrip = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createTrip = (req, res) => {
  createOne(req, res);
  console.log("created");
};

//REST API PUT=================================================
const updateTrip = (req, res) => {
  updateOne(req, res);
};

//REST API DELETE=================================================
const deleteTrip = (req, res) => {
  deleteOne(req, res);
};

module.exports = {
  getTrip,
  getAllTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
