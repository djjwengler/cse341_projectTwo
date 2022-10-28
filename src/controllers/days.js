"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongodb = require('../database/connect');
var ObjectId = require('mongodb').ObjectId;
var dotenv = require('dotenv');
dotenv.config();
var getAllDays = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var days, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongodb.getDatabase().db(process.env.DB_NAME).collection('Days').find()];
            case 1:
                days = _a.sent();
                days.toArray(function (err, lists) {
                    if (err) {
                        res.status(400).json({ message: err });
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(lists);
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOneDay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dayId, day, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!ObjectId.isValid(req.params.id)) {
                    res.status(400).json('Must use a valid contact id to find a day.');
                }
                dayId = new ObjectId(req.params.id);
                return [4 /*yield*/, mongodb
                        .getDatabase()
                        .db(process.env.DB_NAME)
                        .collection('Days')
                        .find({ _id: dayId })];
            case 1:
                day = _a.sent();
                day.toArray(function (err, result) {
                    if (err) {
                        res.status(400).json({ message: err });
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(result[0]);
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOneDaybyName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dayArray, dayName, day, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                if (!dayArray.includes(req.params.name)) {
                    res.status(400).json('Must use a valid titlecase day name to see day.');
                }
                dayName = req.params.name;
                return [4 /*yield*/, mongodb
                        .getDatabase()
                        .db(process.env.DB_NAME)
                        .collection('Days')
                        .find({ name: dayName })];
            case 1:
                day = _a.sent();
                day.toArray(function (err, result) {
                    if (err) {
                        res.status(400).json({ message: err });
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(result[0]);
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createDay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newDay, create, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newDay = {
                    name: req.body.name,
                    recipeName: req.body.recipeName
                };
                return [4 /*yield*/, mongodb
                        .getDatabase()
                        .db(process.env.DB_NAME)
                        .collection('Days')
                        .insertOne(newDay)];
            case 1:
                create = _a.sent();
                if (create.acknowledged) {
                    res.status(201).json(create);
                }
                else {
                    res
                        .status(500)
                        .json(create.error || 'An error occurred while creating the day. Please try again later.');
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteDay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dayId, deleteDay_1, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!ObjectId.isValid(req.params.id)) {
                    res.status(400).json('Must use a valid contact id to delete a contact.');
                }
                dayId = new ObjectId(req.params.id);
                return [4 /*yield*/, mongodb
                        .getDatabase()
                        .db(process.env.DB_NAME)
                        .collection('Days')
                        .deleteOne({ _id: dayId })];
            case 1:
                deleteDay_1 = _a.sent();
                console.log(deleteDay_1);
                if (deleteDay_1.deletedCount > 0) {
                    res.status(200).send();
                }
                else {
                    res
                        .status(500)
                        .json(deleteDay_1.error || 'An error occurred while deleting the day. Please try again later.');
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateDay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dayId, updateDay_1, update, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!ObjectId.isValid(req.params.id)) {
                    res.status(400).json('Must use a valid contact id to update a day.');
                }
                dayId = new ObjectId(req.params.id);
                updateDay_1 = {
                    name: req.body.name,
                    recipeName: req.body.recipeName
                };
                return [4 /*yield*/, mongodb
                        .getDatabase()
                        .db(process.env.DB_NAME)
                        .collection('Days')
                        .replaceOne({ _id: dayId }, updateDay_1)];
            case 1:
                update = _a.sent();
                console.log(update);
                if (update.modifiedCount > 0) {
                    res.status(204).send();
                }
                else {
                    res
                        .status(500)
                        .json(update.error || 'An error occurred while updating the day. Please try again later.');
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(500).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateDaybyName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dayArray, dayName, updateDay_2, update, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                if (!dayArray.includes(req.params.name)) {
                    res.status(400).json('Must use a valid titlecase day name to see day.');
                }
                dayName = req.params.name;
                updateDay_2 = {
                    name: req.body.name,
                    recipeName: req.body.recipeName
                };
                return [4 /*yield*/, mongodb
                        .getDatabase()
                        .db(process.env.DB_NAME)
                        .collection('Days')
                        .replaceOne({ name: dayName }, updateDay_2)];
            case 1:
                update = _a.sent();
                console.log(update);
                if (update.modifiedCount > 0) {
                    res.status(204).send();
                }
                else {
                    res
                        .status(500)
                        .json(update.error || 'An error occurred while updating the day. Please try again later.');
                }
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(500).json(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    getAllDays: getAllDays,
    getOneDay: getOneDay,
    updateDay: updateDay,
    deleteDay: deleteDay,
    createDay: createDay,
    getOneDaybyName: getOneDaybyName,
    updateDaybyName: updateDaybyName
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
