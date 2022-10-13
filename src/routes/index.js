const routes = require('express').Router();
const recipes = require('./recipes');
const days = require('./days');

routes.use('/', require('./swagger'));
routes.use('/recipes', recipes);
routes.use('/days', days);
routes.use('/', () => {});

module.exports = routes;
