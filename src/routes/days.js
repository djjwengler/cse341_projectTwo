const routes = require("express").Router();
const daysController = require("../controllers/days");

//retrieves all days
routes.get("/", daysController.getAllDays);

//retrieves one day by ID
routes.get("/:id", daysController.getOneDay);

module.exports = routes;
