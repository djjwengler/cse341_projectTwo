const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();

const getAllDays = async (req, res) => {
  // #swagger.description = 'See all days'
  try {
    const days = await mongodb.getDatabase().db(process.env.DB_NAME).collection('Days').find();
    days.toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneDay = async (req, res) => {
  // #swagger.description = 'See one day'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a day.');
    }
    const dayId = new ObjectId(req.params.id);
    const day = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .find({ _id: dayId });
    day.toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneDaybyName = async (req, res) => {
  // #swagger.description = 'See one day by name'
  try {
    const dayName = req.params.name;
    const day = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .find({ name: dayName });
    day.toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createDay = async (req, res) => {
  // #swagger.description = 'Create new day'
  try {
    const newDay = {
      name: req.body.name,
      mealId: req.body.mealId
    };
    const create = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .insertOne(newDay);
    if (create.acknowledged) {
      res.status(201).json(create);
    } else {
      res
        .status(500)
        .json(create.error || 'An error occurred while creating the day. Please try again later.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteDay = async (req, res) => {
  // #swagger.description = 'Delete day by ID'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const dayId = new ObjectId(req.params.id);
    const deleteDay = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .deleteOne({ _id: dayId });
    console.log(deleteDay);
    if (deleteDay.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          deleteDay.error || 'An error occurred while deleting the day. Please try again later.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateDay = async (req, res) => {
  // #swagger.description = 'Update day by ID'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to update a day.');
    }
    const dayId = new ObjectId(req.params.id);
    const updateDay = {
      name: req.body.name,
      mealId: req.body.mealId
    };
    const update = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .replaceOne({ _id: dayId }, updateDay);
    console.log(update);
    if (update.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(update.error || 'An error occurred while updating the day. Please try again later.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllDays,
  getOneDay,
  updateDay,
  deleteDay,
  createDay,
  getOneDaybyName
};
