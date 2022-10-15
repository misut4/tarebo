const { default: mongoose } = require("mongoose");
const Review = mongoose.model("Review");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, id) {
  Review.find({
    _id: id,
  })
    .then((review) => {
      return res.json(review);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findMany(req, res) {
  Review.find()
    .populate("belongTo")
    .select()
    .then((review) => {
      return res.json(review);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
  const title = req.body.title;
  const like = req.body.like;
  const content = req.body.content;
  const createDate = req.body.createDate;

  // if (!email || !username || !password) {
  //     res.status(422).json({ error: "Please add all the fields" })
  // }
  //make password not show on database
  // req.user.password = undefined
  req.user.password = undefined;
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
  const id = req.params;
  findOne(req, res);
};

const getAllReview = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createReview = (req, res) => {
  createOne(req, res);
  console.log("created");
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
};
