const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;
const dotenv = require("dotenv");
dotenv.config();

const getAllRecipes = async (req, res) => {
  // #swagger.description = 'See all recipes'
  try {
    const recipes = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection("Recipes")
      .find();
    recipes.toArray().then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneRecipe = async (req, res) => {
  // #swagger.description = 'See one recipe'
  try {
    const recipeId = new ObjectId(req.params.id);
    const recipe = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection("Recipes")
      .find({ _id: recipeId });
    recipe.toArray().then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRecipe = async (req, res) => {
  // #swagger.description = 'Create new recipe'
  try {
    const newRecipe = {
      name: req.body.name,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
    };
    const create = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection("Recipes")
      .insertOne(newRecipe);
    if (create.acknowledged) {
      res.status(201).json(create);
    } else {
      res
        .status(500)
        .json(
          create.error ||
            "An error occurred while creating the recipe. Please try again later."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRecipe = async (req, res) => {
  // #swagger.description = 'Delete recipe by ID'
  try {
    const recipeId = new ObjectId(req.params.id);
    const deleteRecipe = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection("Recipes")
      .deleteOne({ _id: recipeId });
    console.log(deleteRecipe);
    if (deleteRecipe.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          deleteRecipe.error ||
            "An error occurred while deleting the recipe. Please try again later."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRecipe = async (req, res) => {
  // #swagger.description = 'Update recipe by ID'
  try {
    const recipeId = new ObjectId(req.params.id);
    const updateRecipe = {
      name: req.body.name,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
    };
    const update = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection("Recipes")
      .replaceOne({ _id: recipeId }, updateRecipe);
    console.log(update);
    if (update.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          update.error ||
            "An error occurred while updating the recipe. Please try again later."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  createRecipe,
};
