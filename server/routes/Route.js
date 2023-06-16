const routes = require("express").Router();
const controller = require("../controller/Control");

routes
  .post("/api/categories", controller.createCategories)
  .get("/api/categories", controller.getCategories)
  .post("/api/transaction", controller.createTransaction)
  .get("/api/transaction", controller.getTransaction)
  .delete("/api/transaction", controller.deleteTransaction)
  .get("/api/label", controller.getLabel);

module.exports = routes;
