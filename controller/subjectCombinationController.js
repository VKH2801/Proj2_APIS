const lodash = require("lodash");
const STATUS = require("../utils/ResStatus");
const SubjectCombination = require("../models/subjectCombinationModel");
const USER = require("../models/userModel");
const GENERALKNOWNLEDGE = require("../models/generalKnowledgeModel");

const getAllSubCombination = async (req, res) => {
  try {
    const findSubjCombination = await SubjectCombination.find().populate('idGeneralKnowledge');
    res.status(200).json({
      code: 200,
      data: findSubjCombination,
      message: "OK",
    });
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const getByIdSubjCombination = async (req, res) => {
  try {
    const findByIdCombination = await SubjectCombination.findById({
      _id: req.params.id,
    }).populate('idGeneralKnowledge');
    if (findByIdCombination) {
      res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: findByIdCombination,
        message: "OK",
      });
    } else {
      res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: STATUS.MessageRes.status403,
      });
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const createSubjCombination = async (req, res) => {
  try {
    const {
      content,
      title,
      totalCredits,
      percents,
      idGeneralKnowledge,
      createdBy,
    } = req.body;
    if (!idGeneralKnowledge || !createdBy) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      });
    }
    const findUserForCreate = await USER.findOne({ _id: createdBy });
    const findGeneralKnowledge = await GENERALKNOWNLEDGE.findOne({
      _id: idGeneralKnowledge,
    });
    if (!findUserForCreate) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      });
    }
    if (!findGeneralKnowledge) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: "Invalid general knowledge",
      });
    }

    const newSubjCombination = new SubjectCombination({
      content: content,
      title: title,
      totalCredits: totalCredits,
      percents: percents,
      idGeneralKnowledge: findGeneralKnowledge,
      idUserLatestEdit: findUserForCreate,
      listIdUserEdited: [findUserForCreate],
      createdBy: findUserForCreate,
    });
    const result = await newSubjCombination.save();
    return res.status(STATUS.CodeRes.CodeOk).json({
      code: STATUS.CodeRes.CodeOk,
      data: result,
      message: STATUS.MessageRes.status200,
    });
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const updateSubjCombination = async (req, res) => {
  try {
    const { idUserLatestEdit } = req.body;
    let data = req.body;
    if (!idUserLatestEdit) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      });
    }

    if (data.idGeneralKnowledge) {
      const findGenKnowledgeUpdate = await GENERALKNOWNLEDGE.findOne({_id: data.idGeneralKnowledge});
      if (!findGenKnowledgeUpdate) {
       return res.status(401).json({
        code: 401,
        message: 'Invalid General knowledge for update',
       })
      }
    }

    const findUserForEdit = await USER.findOne({ _id: idUserLatestEdit });
    if (!findUserForEdit) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      });
    }

    const findSubjCom = await SubjectCombination.findOne({
      _id: req.params.id,
    });
    if (!findSubjCom) {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: STATUS.MessageRes.status403,
      });
    } else {
      data.idGeneralKnowledge = findSubjCom.idGeneralKnowledge;
      data.listIdUserEdited = findSubjCom.listIdUserEdited
        ? findSubjCom.listIdUserEdited
        : [];
      data.createdBy = findSubjCom.createdBy ? findSubjCom.createdBy : "";
      if (!data.listIdUserEdited.includes(idUserLatestEdit)) {
        data.listIdUserEdited.push(idUserLatestEdit);
      }
      const result = await SubjectCombination.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: lodash.omit(data, "createdBy") },
        { new: true }
      );
      return res.status(200).json({
        code: 200,
        data: result,
        message: "OK",
      });
    }
  } catch (e) {
    res.status(500).json({
      code: 500,
      message: e.message,
    });
  }
};

const deleteAllSubjComb = async (req, res) => {
  try {
    let result = await SubjectCombination.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(401).json({
        code: 401,
        message: "Overview is empty",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    let overview = await SubjectCombination.deleteOne({ _id: req.params.id });
    //console.log(overview);
    if (overview.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Overview not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    });
  }
};

module.exports = {
  getAllSubCombination,
  getByIdSubjCombination,
  createSubjCombination,
  updateSubjCombination,
  deleteAllSubjComb,
  deleteById,
};
