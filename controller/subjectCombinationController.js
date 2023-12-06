const lodash = require("lodash");
const STATUS = require("../utils/ResStatus");
const SUBJECTCOMBINATION = require("../models/subjectCombinationModel");
const USER = require('../models/userModel');
const GENERALKNOWNLEDGE = require('../models/generalKnowledgeModel');

const getAllSubCombination = async (req, res) => {
  try {
    const findSubjCombination = await SUBJECTCOMBINATION.find();
    res.status(200).json({
      code: 200,
      data: findSubjCombination,
      message: "OK",
    });
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}

const getByIdSubjCombination = async (req, res) => {
  try {
    const findByIdCombination = await SUBJECTCOMBINATION.findOne({_id: req.params.id});
    if (findByIdCombination) {
      res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: findByIdCombination,
        message: "OK",
      })
    } else {
      res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: STATUS.MessageRes.status403,
      })
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}

const createSubjCombination = async (req, res) => {
  try {
    const {name, totalCredits, percents, idGeneralKnowledge, idUserLatestEdit, listIdUserEdited, createdBy} = req.body;
    if (!name || !totalCredits || !percents || !idGeneralKnowledge || !createdBy) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      })  
    }

    const findSubjCombination = await SUBJECTCOMBINATION.findOne({name: name});
    const findUserForCreate = await USER.findOne({_id: createdBy});
    const findGeneralKnowledge = await GENERALKNOWNLEDGE.findOne({_id: idGeneralKnowledge});
    if(!findUserForCreate) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      })
    }
    if(!findGeneralKnowledge) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: 'Invalid general knowledge'
      })
    }

    if (!findSubjCombination) {
      const newSubjCombination = new SUBJECTCOMBINATION({
        name: name,
        totalCredits: totalCredits,
        percents: percents,
        idGeneralKnowledge: idGeneralKnowledge,
        idUserLatestEdit: findUserForCreate,
        listIdUserEdited: [findUserForCreate],
        createdBy: findUserForCreate,
      })
      const result = await newSubjCombination.save();
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: result,
        message: STATUS.MessageRes.status200,
      });
    } else {
      return res.status(STATUS.CodeRes.CodeExistData).json({
        code: STATUS.CodeRes.CodeExistData,
        message: STATUS.MessageRes.status400,
      })
    }

  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}

const updateSubjCombination = async (req, res) => {
  
}

module.exports = {
  getAllSubCombination,
  getByIdSubjCombination,
  createSubjCombination,
}