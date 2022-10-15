const { default: mongoose } = require("mongoose");
const  Trip  = mongoose.model("Trip");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, id) {
    Trip.find({
        _id: id
    })
    .then((trip) => {
      return res.json(trip);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findMany(req, res) {
  Trip.find()
    .populate('belongTo').select()
    .then((trip) => {
      return res.json(trip);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate
    const createDate = req.body.createDate

    // if (!email || !username || !password) {
    //     res.status(422).json({ error: "Please add all the fields" })
    // }
    //make password not show on database
    // req.user.password = undefined
    req.user.password = undefined
    const trip = new Trip({
        //key and value are the same so only need to type one
        title,
        startDate,
        endDate,
        createDate,
        belongTo: req.user
    })
    trip.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })

}

async function updateOne(req, res) {
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate
    const createDate = req.body.createDate

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
        createDate
    })
    trip.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })
}

async function deleteOne(req, res) {
    try {
		await Trip.deleteOne({ _id: req.params.id })
		res.status(200).send()
	} catch {
		res.status(200)
		res.send({ msg: "Trip doesn't exist!", code: "400" })
	}
}

//=====================================================================================

//REST API GET=================================================
const getTrip = (req, res) => {
  const id = req.params;
  findOne(req, res);
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
