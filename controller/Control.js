const model = require("../models/model");

// post - categories
const createCategories = async (req, res) => {
  try {
    const Create = new model.Categories({
      type: "Investment",
      color: "rgb(54, 162, 235)",
    });

    await Create.save();

    return res.json(Create);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error while creating categories ${error}` });
  }
};

// get - categories

async function getCategories(req, res) {
  let data = await model.Categories.find();

  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

// post - Transaction
async function createTransaction(req, res) {
  try {
    const { name, type, amount } = req.body;

    const newTransaction = new model.Transaction({
      name,
      type,
      amount,
      date: new Date(),
    });

    const createdTransaction = await newTransaction.save();

    res.status(201).json(createdTransaction);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while creating transaction: ${error}` });
  }
}

// get - transaction
async function getTransaction(req, res) {
  let data = await model.Transaction.find();
  return res.json(data);
}

// delete - transaction
async function deleteTransaction(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await model.Transaction.deleteOne(req.body);
    return res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while deleting transaction" });
  }
}
// get - labels
async function getLabel(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup collection Error");
    });
}

module.exports = {
  createCategories,
  getCategories,
  createTransaction,
  getTransaction,
  deleteTransaction,
  getLabel,
};
