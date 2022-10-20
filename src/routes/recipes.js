const routes = require('express').Router();
const recipesController = require('../controllers/recipes');
const validation = require('../middleware/validation');

//retrieves all recipes
routes.get('/', recipesController.getAllRecipes);

//retrieves one recipe by ID
routes.get('/:id', recipesController.getOneRecipe);

//updates one recipe by ID
routes.put('/:id', validation.saveRecipe, recipesController.updateRecipe);

//deletes one recipe by ID
routes.delete('/:id', recipesController.deleteRecipe);

//creates one recipe
routes.post('/', validation.saveRecipe, recipesController.createRecipe);

module.exports = routes;
