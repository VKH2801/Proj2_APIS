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
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: "Missing Id in request parameter",
      });
      return;
    }
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
    let { id, title, createBy } = req.body;
    if (!title || !id || !createBy) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }
    const findTraining = await TrainingRegulation.findOne({ id: id });
    const findUserIdCreate = await UserSchema.findOne({ _id: createBy });
    if (!findUserIdCreate) {
      return res.status(405).json({
        code: 405,
        message: "Invalid User",
      });
    }
    if (!findTraining) {
      console.log(id, title);
      let trainingReg = new TrainingRegulation({
        id: id,
        title: title,
        idUserLatestEdit: findUserIdCreate,
        listIdUserEdited: [createBy],
        createdBy: findUserIdCreate,
      });
      let result = await trainingReg.save();
      res.status(200).json({
        code: 200,
        data: lodash.omit(result.toObject()),
        message: "OK",
      });
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: "Existing training regulation id",
      });
    }
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
    //console.log(trainingReg);
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

    if (data.listIdUserEdited) {
      return res.status(402).json({
        code: 402,
        message: "Unable to update list user edited",
      });
    }

    if (data.createBy) {
      return res.status(402).json({
        code: 402,
        message: "Unable to update id user created",
      });
    }

    if (!data.idUserLatestEdit) {
      return res.status(401).json({
        code: 401,
        message: "Missing data user latest update",
      });
    }

    if (data.id !== trainingReg.id) {
      res.status(402).json({
        code: 402,
        message: "Unable update id - It a unique key",
      });
      return;
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

    req.body.listIdUserEdited = trainingReg.listIdUserEdited;
    let _listUserEdited = trainingReg.listIdUserEdited;

    if (!_listUserEdited.includes(data.idUserLatestEdit)) {
      _listUserEdited.push(findUserIdEdit._id);
    }

    req.body.idUserLatestEdit = trainingReg.idUserLatestEdit;
    req.body.createBy = trainingReg.createdBy;

    const updatedTrainingReg = await TrainingRegulation.findByIdAndUpdate(
      req.params.id,
      { $set: lodash.omit(req.body, "id") },
      { new: true }
    );

    const findUserCreated = await UserSchema.findOne({
      _id: updatedTrainingReg.createdBy,
    });

    const resData = {
      _id: updatedTrainingReg._id,
      __v: updatedTrainingReg.__v,
      id: updatedTrainingReg.id,
      title: updatedTrainingReg.title,
      idUserLatestEdit: findUserIdEdit,
      listIdUserEdited: updatedTrainingReg.listIdUserEdited,
      createdBy: findUserCreated
        ? findUserCreated
        : updatedTrainingReg.createdBy,
    };
    res.status(200).json({
      code: 200,
      data: resData,
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
