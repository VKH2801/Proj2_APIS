const lodash = require("lodash");
const OutputType = require("../models/outputTypeModel");
const User = require("../models/userModel");

const getAllOutputTypes = async (req, res) => {
  try {
    let findOutputType = await OutputType.find();
    //console.log(findOutputType);
    res.status(200).json({
      code: 200,
      data: findOutputType,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const getOutputTypeById = async (req, res) => {
  try {
    let findOutputType = await OutputType.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: "Missing data in request parameters",
      });
      return;
    }
    return res.status(200).json({
      code: 200,
      data: findOutputType,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const createNewOutputType = async (req, res) => {
  try {
    let { title, content, createdBy } = req.body;
    if (!title || !createdBy) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }
    const findUser = await User.findOne({ _id: createdBy });
    if (!findUser) {
      return res.status(401).json({
        code: 401,
        message: "Invalid user for create",
      });
    }
    const newOutputType = new OutputType({
      title: title ?? "",
      content: content ?? "",
      idUserLatestEdit: findUser,
      listIdUserEdited: [findUser],
      createdBy: findUser,
    });
    let result = await newOutputType.save();
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

const updateOutputType = async (req, res) => {
  try {
    const findOutput = await OutputType.findOne({ _id: req.params.id });
    let { title, content, idUserLatestEdit } = req.body;
    if (!idUserLatestEdit) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }
    const findUser = await User.findOne({ _id: idUserLatestEdit });
    if (!findUser) {
      return res.status(401).json({
        code: 401,
        message: "Invalid user for update",
      });
    }
    if (findOutput) {
      req.body.createdBy = findOutput.createdBy;
      if (!req.body.listIdUserEdited) {
        req.body.listIdUserEdited = findOutput.listIdUserEdited;
      }
      if (!req.body.listIdUserEdited.includes(idUserLatestEdit)) {
        req.body.listIdUserEdited.push(idUserLatestEdit);
      }
      await findOutput.updateOne({ $set: lodash.omit(req.body) });
      let data = await OutputType.findOne({ _id: req.params.id });
      res.status(200).json({
        code: 200,
        data: data,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existing Output type",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteAllOutputTypes = async (req, res) => {
  try {
    const result = await OutputType.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existing Output type",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteOutputTypesById = async (req, res) => {
  try {
    const result = await OutputType.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existing Output type",
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
  getAllOutputTypes,
  getOutputTypeById,
  createNewOutputType,
  updateOutputType,
  deleteAllOutputTypes,
  deleteOutputTypesById,
};
