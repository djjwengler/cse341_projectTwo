const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const saveRecipe = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    ingredients: 'required|array',
    directions: 'required|array',
    groceryList: 'required|array',
    mealType: 'required|string',
    tags: 'array',
    pairsWith: 'array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveDay = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    mealId: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRecipe,
  saveDay
};
