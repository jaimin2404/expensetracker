const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// categories => field => ['type','color']
const categoriesModel = new Schema({
  type: {
    type: String,
    default: "Investment",
  },
  color: {
    type: String,
    default: "rgb(54, 162, 235)",
  },
});

// transaction => field => ['name','type','amount','date']

const transactionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Categories = mongoose.model("categories", categoriesModel);
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = {
  Categories,
  Transaction,
};
