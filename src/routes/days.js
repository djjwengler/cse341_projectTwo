const routes = require('express').Router();
const daysController = require('../controllers/days');
const validation = require('../../validation');

//retrieves all days
routes.get('/', daysController.getAllDays);

//retrieves one day by ID
routes.get('/:id', daysController.getOneDay);

//updates one day by ID
routes.put('/:id', validation.saveDay, daysController.updateDay);

module.exports = routes;
