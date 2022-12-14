const mongodb = require('../database/connect');
import { Request, Response, NextFunction } from "express";
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();

const getAllDays = async (req: Request, res: Response) => {
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

const getOneDay = async (req:Request, res:Response) => {
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

const getOneDaybyName = async (req:Request, res: Response) => {
  // #swagger.description = 'See one day by name'

  try {
    const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (!dayArray.includes(req.params.name)) {
      res.status(400).json('Must use a valid titlecase day name to see day.');
    }
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

const createDay = async (req:Request, res: Response) => {
  // #swagger.description = 'Create new day'
  try {
    const newDay = {
      name: req.body.name,
      recipeName: req.body.recipeName
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

const deleteDay = async (req:Request, res: Response) => {
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

const updateDay = async (req:Request, res: Response) => {
  // #swagger.description = 'Update day by ID'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to update a day.');
    }
    const dayId = new ObjectId(req.params.id);
    const updateDay = {
      name: req.body.name,
      recipeName: req.body.recipeName
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

const updateDaybyName = async (req:Request, res: Response) => {
  // #swagger.description = 'Update day by ID'
  try {
    const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (!dayArray.includes(req.params.name)) {
      res.status(400).json('Must use a valid titlecase day name to see day.');
    }
    const dayName = req.params.name;
    const updateDay = {
      name: req.body.name,
      recipeName: req.body.recipeName
    };
    const update = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('Days')
      .replaceOne({ name: dayName }, updateDay);
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
  getOneDaybyName,
  updateDaybyName
};

//Future possible controls:

// const getOneMealbyDay = async (req, res) => {
//   // #swagger.description = 'See one day's meal'
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       res.status(400).json('Must use a valid contact id to find a day.');
//     }
//     const dayId = new ObjectId(req.params.id);
//     const day = await mongodb
//       .getDatabase()
//       .db(process.env.DB_NAME)
//       .collection('Days')
//       .aggregate([
//         {
//           $lookup: {
//             from: 'Recipes',
//             localField: 'recipeName',
//             foreignField: 'name',
//             as: 'recipe'
//           }
//         }
//       ]);
//     day.toArray((err, result) => {
//       if (err) {
//         res.status(400).json({ message: err });
//       }
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(result[0]);
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
