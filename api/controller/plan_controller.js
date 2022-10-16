const { default: mongoose } = require("mongoose");
// const Plan = mongoose.model("Plan");
const Plan = require('../../model/plan')

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, id) {
  Plan.find({
    _id: id,
  })
    .then((plan) => {
      return res.json(plan);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findMany(req, res) {
  Plan.find()
    .populate("belongTo")
    .then((plan) => {
      return res.json(plan);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
  console.log(req.body.plan);

  req.body.plan.forEach(async (element) => {
    const _id = element._id;
    const name = element.name;
    const place_id = element.place_id;
    const place_name = element.place_name;
    const trip_id = element.trip_id;

    console.log(element.name);

    element = new Plan({
      //key and value are the same so only need to type one
      _id,
      name,
      place_id,
      place_name,
      belongTo: trip_id,
    });
    await element.save().catch((err) => {
      console.log(err);
    });
  });
  return res.status(200).json({msg: "success"})
}

async function updateOne(req, res) {
  const _id = req.body._id;
  const name = req.body.name;
  const place_id = req.body.place_id;

  if (username) {
    res.status(200).json({ msg: "Please add all the fields", code: 400 });
  }
  //make password not show on database
  // req.user.password = undefined
  const plan = new Plan({
    //key and value are the same so only need to type one
    _id,
    name,
    place_id,
  });
  plan
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
    await Plan.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(200);
    res.send({ msg: "Plan doesn't exist!", code: "400" });
  }
}

//=====================================================================================

//REST API GET=================================================
const getPlan = (req, res) => {
  const id = req.params;
  findOne(req, res);
};

const getAllPlan = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createPlan = (req, res) => {
  createOne(req, res);
};

//REST API PUT=================================================
const updatePlan = (req, res) => {
  updateOne(req, res);
};

//REST API DELETE=================================================
const deletePlan = (req, res) => {
  deleteOne(req, res);
};

module.exports = {
  getPlan,
  getAllPlan,
  createPlan,
  updatePlan,
  deletePlan,
};
