const lodash = require("lodash");
const TrainingRegulation = require("../models/trainingRegulationModel");
const UserSchema = require("../models/userModel");
const getAllTrainingReg = async (req, res) => {
  try {
    let data = await TrainingRegulation.find();
    res.status(200).json({
      code: 200,
      data: data,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const getTrainingById = async (req, res) => {
  try {
    let data = await TrainingRegulation.findOne({ _id: req.params.id });
    res.status(200).json({
      code: 200,
      data: lodash.omit(data.toObject()),
      message: "OK",
    });
    return;
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const createNewTrainingReg = async (req, res) => {
  try {
    let { title, content, createdBy } = req.body;
    if (!createdBy) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }
    const findUserIdCreate = await UserSchema.findOne({ _id: createdBy });
    if (!findUserIdCreate) {
      return res.status(405).json({
        code: 405,
        message: "Invalid User",
      });
    }
    let trainingReg = new TrainingRegulation({
      title: title,
      content: content,
      idUserLatestEdit: findUserIdCreate,
      listIdUserEdited: [findUserIdCreate],
      createdBy: findUserIdCreate,
    });
    let result = await trainingReg.save();
    res.status(200).json({
      code: 200,
      data: result,
      message: "OK",
    });
    return;
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const updateTrainingReg = async (req, res) => {
  try {
    let trainingReg = await TrainingRegulation.findOne({ _id: req.params.id });
    let data = req.body;

    if (!trainingReg) {
      return res.status(403).json({
        code: 403,
        message: "Non existent training regulation",
      });
    }

    if (!data) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }

    data.listIdUserEdited = trainingReg.listIdUserEdited;
    data.createBy = trainingReg.createBy;

    if (!data.idUserLatestEdit) {
      return res.status(401).json({
        code: 401,
        message: "Missing data user for update",
      });
    }

    const findUserIdEdit = await UserSchema.findOne({
      _id: data.idUserLatestEdit,
    });
    if (!findUserIdEdit) {
      return res.status(405).json({
        code: 405,
        message: "Invalid User for update",
      });
    }

    if (!data.listIdUserEdited.includes(data.idUserLatestEdit)) {
      data.listIdUserEdited.push(data.idUserLatestEdit);
    }

    const result = await TrainingRegulation.findByIdAndUpdate(
      req.params.id,
      { $set: lodash.omit(data) },
      { new: true }
    );

    res.status(200).json({
      code: 200,
      data: result,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteAllTrainingReg = async (req, res) => {
  try {
    let result = await TrainingRegulation.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Training Regulation is empty",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteTrainingRegById = async (req, res) => {
  try {
    let findTrainingReg = await TrainingRegulation.deleteOne({
      _id: req.params.id,
    });

    if (findTrainingReg.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existing data",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

module.exports = {
  getAllTrainingReg,
  getTrainingById,
  createNewTrainingReg,
  updateTrainingReg,
  deleteAllTrainingReg,
  deleteTrainingRegById,
};
