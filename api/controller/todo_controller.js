const { default: mongoose } = require("mongoose");
const  Todo  = mongoose.model("Todo");

//DEDICATED FUNCTIONS=================================
async function findOne(req, res, id) {
    Todo.find({
        _id: id
    })
    .then((todo) => {
      return res.json(todo);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findMany(req, res) {
  Todo.find()
    .then((todo) => {
      return res.json(todo);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createOne(req, res) {
    const _id = req.body._id;
    const content = req.body.content;
    

    // if (!email || !username || !password) {
    //     res.status(422).json({ error: "Please add all the fields" })
    // }
    //make password not show on database
    // req.user.password = undefined
    const todo = new Todo({
        //key and value are the same so only need to type one
        _id,
        content,
        belongTo: req.trip
    })
    todo.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })

}

async function updateOne(req, res) {
    const _id = req.body._id;
    const content = req.body.content;
    

    // if (!email || !username || !password) {
    //     res.status(422).json({ error: "Please add all the fields" })
    // }
    //make password not show on database
    // req.user.password = undefined
    const todo = new Todo({
        //key and value are the same so only need to type one
        _id,
        content
    })
    todo.save().then(result => {
       return res.json(result)
    })
        .catch(err => {
            console.log(err)
        })
}

async function deleteOne(req, res) {
    try {
		await Todo.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Todo doesn't exist!" })
	}
}

//=====================================================================================

//REST API GET=================================================
const getTodo = (req, res) => {
  const id = req.params;
  findOne(req, res);
};

const getAllTodo = (req, res) => {
  findMany(req, res);
};

//REST API POST=================================================
const createTodo = (req, res) => {
  createOne(req, res);
};

//REST API PUT=================================================
const updateTodo = (req, res) => {
  updateOne(req, res);
};

//REST API DELETE=================================================
const deleteTodo = (req, res) => {
  deleteOne(req, res);
};

module.exports = {
  getTodo,
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
