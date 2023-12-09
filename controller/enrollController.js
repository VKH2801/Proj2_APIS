const lodash = require("lodash");
const Enroll = require("../models/enrollModel");
const ResStatus = require("../utils/ResStatus");
const User = require("../models/userModel");

const getAllEnroll = async (req, res) => {
  try {
    let data = await Enroll.find();
    res.status(ResStatus.CodeRes.CodeOk).json({
      code: ResStatus.CodeRes.CodeOk,
      data: data,
      message: ResStatus.MessageRes.status200,
    });
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const getEnrollById = async (req, res) => {
  try {
    let data = await Enroll.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401,
      });
    }
    res.status(ResStatus.CodeRes.CodeOk).json({
      code: ResStatus.CodeRes.CodeOk,
      data: data,
      message: ResStatus.MessageRes.status200,
    });
    return;
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const createNewEnroll = async (req, res) => {
  try {
    let { title, content, createdBy } = req.body;
    if (!title || !content || !createdBy) {
      res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401,
      });
      return;
    }
    const findUserCreate = await User.findOne({ _id: createdBy });
    if (!findUserCreate) {
      return res.status(ResStatus.CodeRes.CodeUserInvalid).json({
        code: ResStatus.CodeRes.CodeUserInvalid,
        message: ResStatus.MessageRes.status405,
      });
    }
    let enroll = new Enroll({
      title: title,
      content: content,
      idUserLatestEdit: findUserCreate,
      listIdUserEdited: [findUserCreate],
      createdBy: findUserCreate,
    });
    let result = await enroll.save();
    return res.status(ResStatus.CodeRes.CodeOk).json({
      code: ResStatus.CodeRes.CodeOk,
      data: result,
      message: ResStatus.MessageRes.status200,
    });
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const updateEnroll = async (req, res) => {
  try {
    let enroll = await Enroll.findOne({ _id: req.params.id });
    let data = req.body;
    if (!data) {
      return res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401,
      });
    }
    if (!data.idUserLatestEdit) {
      return res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401 + ": idUserLatestEdit",
      });
    }
    const findUserForUpdate = await User.findOne({
      _id: data.idUserLatestEdit,
    });
    if (!findUserForUpdate) {
      return res.status(ResStatus.CodeRes.CodeUserInvalid).json({
        code: ResStatus.CodeRes.CodeUserInvalid,
        message: ResStatus.MessageRes.status405,
      });
    }
    data.listIdUserEdited = enroll.listIdUserEdited;
    if (!data.listIdUserEdited.includes(data.idUserLatestEdit)) {
      data.listIdUserEdited.push(data.idUserLatestEdit);
    }
    data.createdBy = enroll.createdBy;
    if (enroll) {
      await enroll.updateOne({ $set: lodash.omit(data) });
      let dataEnrollNew = await Enroll.findOne({ _id: req.params.id });
      return res.status(ResStatus.CodeRes.CodeOk).json({
        code: ResStatus.CodeRes.CodeOk,
        data: lodash.omit(dataEnrollNew.toObject()),
        message: ResStatus.MessageRes.status200,
      });
    } else {
      return res.status(ResStatus.CodeRes.CodeNonExistData).json({
        code: ResStatus.CodeRes.CodeNonExistData,
        message: ResStatus.MessageRes.status403,
      });
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      menubar: err,
    });
  }
};

const deleteAllEnroll = async (req, res) => {
  try {
    let result = await Enroll.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(ResStatus.CodeRes.CodeOk).json({
        code: ResStatus.CodeRes.CodeOk,
        message: ResStatus.MessageRes.status200,
      });
    } else {
      res.status(ResStatus.CodeRes.CodeEmptyCollection).json({
        code: ResStatus.CodeRes.CodeEmptyCollection,
        message: ResStatus.MessageRes.status404,
      });
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const deleteEnrollById = async (req, res) => {
  try {
    let findEnroll = await Enroll.deleteOne({ _id: req.params.id });
    if (findEnroll.deletedCount > 0) {
      res.status(ResStatus.CodeRes.CodeOk).json({
        code: ResStatus.CodeRes.CodeOk,
        message: ResStatus.MessageRes.status200,
      });
      return;
    } else {
      res.status(ResStatus.CodeRes.CodeNonExistData).json({
        code: ResStatus.CodeRes.CodeNonExistData,
        message: ResStatus.MessageRes.status403,
      });
      return;
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

module.exports = {
  getAllEnroll,
  getEnrollById,
  createNewEnroll,
  updateEnroll,
  deleteAllEnroll,
  deleteEnrollById,
};
