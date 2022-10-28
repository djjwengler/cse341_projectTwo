const routes = require('express').Router();
const daysController = require('../controllers/days');
const validation = require('../middleware/validation');
const { requiresAuth } = require('express-openid-connect');

//retrieves all days
routes.get('/', daysController.getAllDays);

//retrieves one day by ID
routes.get('/:id', daysController.getOneDay);

//retrieves one day by name
routes.get('/day/:name', daysController.getOneDaybyName);

//updates one day by ID
routes.put('/:id', validation.saveDay, daysController.updateDay);

//updates one day by name
routes.put('/day/:name', validation.saveDay, daysController.updateDaybyName);

//deletes one day by ID
routes.delete('/:id', requiresAuth(), daysController.deleteDay);

//creates one day
routes.post('/', requiresAuth(), validation.saveDay, daysController.createDay);

module.exports = routes;

//Future possible routes:

//retrieves one day by name
// routes.get('/recipe/:id', daysController.getOneMealbyDay);
