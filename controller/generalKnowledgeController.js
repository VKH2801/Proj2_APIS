const lodash = require("lodash");
const STATUS = require("../utils/ResStatus");
const GeneralKnowledge = require("../models/generalKnowledgeModel");
const User = require("../models/userModel");

const getAllGeneralKnowledge = async (req, res) => {
  try {
    const data = await GeneralKnowledge.find();
    res.status(200).json({
      code: 200,
      data: data,
      message: "OK",
    });
  } catch (err) {
    return res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const getByIdGeneralKnowledge = async (req, res) => {
  try {
    const data = await GeneralKnowledge.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: "Missing data in request parameter",
      });
      return;
    }
    if (data) {
      res.status(200).json({
        code: 200,
        data: data,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existent data",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const createNewGeneralKnowledge = async (req, res) => {
  try {
    const { id, title, idUserLatestEdit, listIdUserEdited, createdBy } =
      req.body;
    if (!id || !title || !createdBy) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      });
    }

    const findUserForCreate = await User.findById({ _id: createdBy });
    if (!findUserForCreate) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      });
    }

    const findGeneralKnowledge = await GeneralKnowledge.findOne({ id: id });
    if (!findGeneralKnowledge) {
      const newGeneralKnowledge = new GeneralKnowledge({
        id: id,
        title: title,
        idUserLatestEdit: findUserForCreate,
        listIdUserEdited: [findUserForCreate],
        createdBy: findUserForCreate,
      });
      const result = await newGeneralKnowledge.save();
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: result,
        message: STATUS.MessageRes.status200,
      });
    } else {
      return res.status(STATUS.CodeRes.CodeExistData).json({
        code: STATUS.CodeRes.CodeExistData,
        message: STATUS.MessageRes.status400,
      });
    }
  } catch (err) {
    return res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const updateGeneralKnowledge = async (req, res) => {
  try {
    const {title, idUserLatestEdit, createdBy} = req.body;
    if (!idUserLatestEdit) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      })
    }

    const findGeneralKnowledge = await GeneralKnowledge.findOne({_id: req.params.id});
    //console.log(findGeneralKnowledge);
    const findCreatedByUser = await User.findOne({_id: createdBy});
    const findUserForEdit = await User.findOne({_id: idUserLatestEdit});

    // if (req.body.id !== findGeneralKnowledge.id) {
    //   return res.status(STATUS.CodeRes.CodeUnableUpdateId).json({
    //     code: STATUS.CodeRes.CodeUnableUpdateId,
    //     message: STATUS.MessageRes.status402,
    //   })
    // }

    if (!findUserForEdit) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      });
    }
    
    // if (createdBy !== findGeneralKnowledge.createdBy) {
    //   return res.status(STATUS.CodeRes.CodeUnableUpdateId).json({
    //     code: STATUS.CodeRes.CodeUnableUpdateId,
    //     message: 'Unable to update createdBy prob',
    //   })
    // }

    if (findGeneralKnowledge) {
      req.body.listIdUserEdited = findGeneralKnowledge.listIdUserEdited ? findGeneralKnowledge.listIdUserEdited : [];
      if (!req.body.listIdUserEdited.includes(idUserLatestEdit)) {
        req.body.listIdUserEdited.push(idUserLatestEdit);
      }

      await GeneralKnowledge.findByIdAndUpdate(
        {_id: req.params.id},
        { $set: lodash.omit(req.body, "id", "createdBy") },
        { new: true }
      )
      
      const data = await GeneralKnowledge.findOne({_id: req.params.id});
      const result = {
        _id: data._id,
        id: data.id,
        title: data.title,
        idUserLatestEdit: findUserForEdit ? findUserForEdit : data.idUserLatestEdit,
        listIdUserEdited: data.listIdUserEdited,
        createdBy: findCreatedByUser ? findCreatedByUser : data.createdBy,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: result,
        message: STATUS.MessageRes.status200,
      })
    } else {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: STATUS.MessageRes.status403,
      })
    }
  } catch (err) {
    return res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const deleteAllGeneralKnowledge = async (req, res) => {
  try {
    const results = await GeneralKnowledge.deleteMany({});
    if (results.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existent General Knowledge collections",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
}

module.exports = {
  getAllGeneralKnowledge,
  getByIdGeneralKnowledge,
  createNewGeneralKnowledge,
  updateGeneralKnowledge,
  deleteAllGeneralKnowledge,
};
