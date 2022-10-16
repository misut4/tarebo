const { default: mongoose } = require("mongoose");
// const Review = mongoose.model("Review");
const Review = require("../../model/review");
const Trip = require("../../model/trip");
const Plan = require("../../model/plan");
const getAllPlan = require("./plan_controller");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, _id) {
  const review = await Review.findById(_id);

  const listPlan = await Promise.all([
    Plan.find({
      belongTo: review.belongToTrip,
    }).exec(),
  ]);

  res.status(200).json({ msg: "success", code: 200, listPlan, review });
}

async function findMany(req, res) {
  const listReview = await Review.find().exec();

  res.status(200).json({
    msg: "success",
    listReview,
  });
}

async function findByCate(req, res) {
  const categoryId = req.body;
  const listReview = await Review.find({
    category: categoryId,
  });

  res.status(200).json({
    msg: "success",
    listReview,
  });
}

async function cloneReview(req, res) {
  const id = req.body._id;
  console.log(id);
  const review = await Review.findOne({
    _id: id,
  });

  const trip = new Trip({
    //key and value are the same so only need to type one
    title: req.body.title,
    belongTo: req.user._id,
  });
  trip.save();

  // const listPlan = await Plan.find({
  //   _id: review.belongToTrip,
  // });

  const listPlan = req.body.listPlan

  listPlan.forEach(async (element) => {
    const _id = element._id;
    const name = element.name;
    const place_id = element.place_id;
    const place_name = element.place_name;
    const trip_id = trip._id;

    console.log(listPlan);

    const plan = new Plan({
      //key and value are the same so only need to type one
      name,
      place_id,
      place_name,
      belongTo: trip_id,
    });
    await plan
      .save()
      .catch((err) => {
        console.log(err);
      });
  });
  return res.status(200).json({ msg: "success" });
  // return res.status(200).json({msg: "we bad", code: 400})
}

async function createOne(req, res) {
  const title = "aaa";

  const trip = new Trip({
    //key and value are the same so only need to type one
    title: title,
    belongTo: req.user._id,
  });
  trip.save().catch((err) => {
    console.log(err);
  });

  req.body.plan.forEach(async (element) => {
    const _id = element._id;
    const name = element.name;
    const place_id = element.place_id;
    const place_name = element.place_name;
    const trip_id = trip._id;

    const plan = new Plan({
      //key and value are the same so only need to type one
      _id,
      name,
      place_id,
      place_name,
      belongTo: trip_id,
    });
    await plan.save().catch((err) => {
      console.log(err);
    });
  });

  req.body.review.forEach(async (element) => {
    const _id = element._id;
    const title = element.title;
    const place_id = element.place_id;
    const place_name = element.place_name;
    const user_id = element.user_id;
    const like = 0;
    const category = element.category;
    const img = element.img;

    console.log(element.name);

    const review = new Review({
      //key and value are the same so only need to type one
      _id,
      title,
      place_id,
      place_name,
      like,
      category,
      img,
      belongTo: user_id,
      belongToTrip: trip._id,
    });
    await review.save().catch((err) => {
      console.log(err);
    });
  });
  return res.status(200).json({ msg: "success" });
}

async function updateOne(req, res) {
  const title = req.body.title;
  const like = req.body.like;
  const content = req.body.content;
  const createDate = req.body.createDate;

  // if (!email || !username || !password) {
  //     res.status(422).json({ error: "Please add all the fields" })
  // }
  //make password not show on database
  // req.user.password = undefined
  const review = new Review({
    //key and value are the same so only need to type one
    title,
    startDate,
    endDate,
    createDate: review.createdAt,
    belongTo: req.user,
  });
  review
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
    await Review.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch {
    res.status(200);
    res.send({ msg: "Review doesn't exist!", code: "400" });
  }
}

//=====================================================================================

//REST API GET=================================================
const getReview = (req, res) => {
  const _id = req.params;
  findOne(req, res, _id);
};

const getAllReview = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createReview = (req, res) => {
  createOne(req, res);
  console.log("created");
};

const shareReview = (req, res) => {
  cloneReview(req, res);
};

//REST API PUT=================================================
const updateReview = (req, res) => {
  updateOne(req, res);
};

//REST API DELETE=================================================
const deleteReview = (req, res) => {
  deleteOne(req, res);
};

module.exports = {
  getReview,
  getAllReview,
  createReview,
  updateReview,
  deleteReview,
  shareReview,
};
