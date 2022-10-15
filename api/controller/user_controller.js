const { default: mongoose } = require("mongoose");
const  User  = mongoose.model("User");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, id) {
    User.find({
        _id: id
    })
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findMany(req, res) {
  User.find()
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
    const _id = req.body._id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = "user";
    const isPremium = false;

    // if (!email || !username || !password) {
    //     res.status(422).json({ error: "Please add all the fields" })
    // }
    //make password not show on database
    // req.user.password = undefined
    const user = new User({
        //key and value are the same so only need to type one
        _id,
        username,
        password,
        email,
        role,
        isPremium
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
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = "user";
    const isPremium = false;

    if (username ) {
        res.status(422).json({ error: "Please add all the fields" })
    }
    //make password not show on database
    // req.user.password = undefined
    const user = new User({
        //key and value are the same so only need to type one
        _id,
        username,
        password,
        email,
        role,
        isPremium
    })
    user.save().then(result => {
       return res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
}

async function deleteOne(req, res) {
    try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
}

//=====================================================================================

//REST API GET=================================================
const getUser = (req, res) => {
  const id = req.params;
  findOne(req, res);
};

const getAllUser = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createUser = (req, res) => {
  createOne(req, res);
};

//REST API PUT=================================================
const updateUser = (req, res) => {
  updateOne(req, res);
};

//REST API DELETE=================================================
const deleteUser = (req, res) => {
  deleteOne(req, res);
};

module.exports = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
