const routes = require('express').Router();
const daysController = require('../controllers/days');
const validation = require('../middleware/validation');

//retrieves all days
routes.get('/', daysController.getAllDays);

//retrieves one day by ID
routes.get('/:id', daysController.getOneDay);

//retrieves one day by name
routes.get('/day/:name', daysController.getOneDaybyName);

//updates one day by ID
routes.put('/:id', validation.saveDay, daysController.updateDay);

//deletes one recipe by ID
routes.delete('/:id', daysController.deleteDay);

//creates one recipe
routes.post('/', validation.saveDay, daysController.createDay);

module.exports = routes;
