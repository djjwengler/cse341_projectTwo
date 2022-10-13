const routes = require("express").Router();
const recipesController = require("../controllers/recipes");

//retrieves all recipes
routes.get("/", recipesController.getAllRecipes);

//retrieves one recipe by ID
routes.get("/:id", recipesController.getOneRecipe);

//updates one recipe by ID
routes.put("/:id", recipesController.updateRecipe);

//deletes one recipe by ID
routes.delete("/:id", recipesController.deleteRecipe);

//creates one recipe
routes.post("/", recipesController.createRecipe);

module.exports = routes;
