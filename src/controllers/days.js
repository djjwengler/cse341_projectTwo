const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();

const getAllDays = async (req, res) => {
  // #swagger.description = 'See all days'
  try {
    const days = await mongodb.getDatabase().db(process.env.DB_NAME).collection('Days').find();
    days.toArray().then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneDay = async (req, res) => {
  // #swagger.description = 'See one day'
  try {
    const dayId = new ObjectId(req.params.id);
    const day = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .find({ _id: dayId });
    day.toArray().then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllDays,
  getOneDay
};
