const { default: mongoose } = require("mongoose");
const  Expense  = mongoose.model("Expense");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, id) {
    Expense.find({
        _id: id
    })
    .then((expense) => {
      return res.json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findMany(req, res) {
  Expense.find()
    .then((expense) => {
      return res.json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
    const _id = req.body._id;
    const description = req.body.description;
    const amount = req.body.amount;
    const purpose = req.body.purpose

    // if (!email || !username || !password) {
    //     res.status(422).json({ error: "Please add all the fields" })
    // }
    //make password not show on database
    // req.user.password = undefined
    const expense = new Expense({
        //key and value are the same so only need to type one
        _id,
        description,
        amount,
        purpose,
        belongTo: req.trip
    })
    expense.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })

}

async function updateOne(req, res) {
    const _id = req.body._id;
    const description = req.body.description;
    const amount = req.body.amount;
    const purpose = req.body.purpose

    // if (!email || !username || !password) {
    //     res.status(422).json({ error: "Please add all the fields" })
    // }
    //make password not show on database
    // req.user.password = undefined
    const expense = new Expense({
        //key and value are the same so only need to type one
        _id,
        description,
        amount,
        purpose,
    })
    expense.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })
}

async function deleteOne(req, res) {
    try {
		await Expense.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(200)
		res.send({ msg: "Expense doesn't exist!", code: "400" })
	}
}

//=====================================================================================

//REST API GET=================================================
const getExpense = (req, res) => {
  const id = req.params;
  findOne(req, res);
};

const getAllExpense = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createExpense = (req, res) => {
  createOne(req, res);
};

//REST API PUT=================================================
const updateExpense = (req, res) => {
  updateOne(req, res);
};

//REST API DELETE=================================================
const deleteExpense = (req, res) => {
  deleteOne(req, res);
};

module.exports = {
  getExpense,
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
