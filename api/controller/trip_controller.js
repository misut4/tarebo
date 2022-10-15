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
    .then((trip) => {
      return res.json(trip);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
    const _id = req.body._id;
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
        _id,
        title,
        startDate,
        endDate,
        createDate
    })
    user.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })

}

async function updateOne(req, res) {
    const _id = req.body._id;
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
        _id,
        title,
        startDate,
        endDate,
        createDate
    })
    user.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })
}

async function deleteOne(req, res) {
    try {
		await Trip.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Trip doesn't exist!" })
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
