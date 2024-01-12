const lodash = require("lodash");
const STATUS = require("../utils/ResStatus");
const SubjectCombination = require("../models/subjectCombinationModel");
const USER = require("../models/userModel");
const GENERALKNOWNLEDGE = require("../models/generalKnowledgeModel");

const getAllSubCombination = async (req, res) => {
  try {
    const findSubjCombination = await SubjectCombination.find().populate('listSubjectDetails');
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
    }).populate('listSubjectDetails');
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
      createdBy,
    } = req.body;
    if (!createdBy) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      });
    }
    const findUserForCreate = await USER.findOne({ _id: createdBy });
    if (!findUserForCreate) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      });
    }
    

    const newSubjCombination = new SubjectCombination({
      content: content ?? "",
      title: title ?? "",
      totalCredits: totalCredits ?? 0,
      percents: percents ?? 0,
      type: req.body.type,
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

// const updateSubjCombination = async (req, res) => {
//   try {
//     const { idUserLatestEdit, idGeneralKnowledge } = req.body;
//     let data = req.body;

//     if (!idUserLatestEdit) {
//       return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
//         code: STATUS.CodeRes.CodeMissingRequiredData,
//         message: STATUS.MessageRes.status401,
//       });
//     }

//     if (idGeneralKnowledge) {
//       const findGenKnowledgeUpdate = await GENERALKNOWNLEDGE.findOne({
//         _id: idGeneralKnowledge,
//       });
//       req.body.idGeneralKnowledge = findGenKnowledgeUpdate
//       if (!findGenKnowledgeUpdate) {
//         return res.status(401).json({
//           code: 401,
//           message: "Invalid General knowledge for update",
//         });
//       }
//     } else {
//       req.body.idGeneralKnowledge = findSubjCom.idGeneralKnowledge;
//     }

//     const findUserForEdit = await USER.findOne({ _id: idUserLatestEdit });
//     if (!findUserForEdit) {
//       return res.status(STATUS.CodeRes.CodeUserInvalid).json({
//         code: STATUS.CodeRes.CodeUserInvalid,
//         message: STATUS.MessageRes.status405,
//       });
//     }

//     const findSubjCom = await SubjectCombination.findOne({
//       _id: req.params.id,
//     });
//     if (!findSubjCom) {
//       return res.status(STATUS.CodeRes.CodeNonExistData).json({
//         code: STATUS.CodeRes.CodeNonExistData,
//         message: STATUS.MessageRes.status403,
//       });
//     } else {
      
//       data.listIdUserEdited = findSubjCom.listIdUserEdited
//         ? findSubjCom.listIdUserEdited
//         : [];
//       data.createdBy = findSubjCom.createdBy ? findSubjCom.createdBy : "";
//       if (!data.listIdUserEdited.includes(idUserLatestEdit)) {
//         data.listIdUserEdited.push(idUserLatestEdit);
//       }
//       const result = await SubjectCombination.findByIdAndUpdate(
//         { _id: req.params.id },
//         { $set: lodash.omit(data, "createdBy") },
//         { new: true }
//       ).populate('idGeneralKnowledge');
//       return res.status(STATUS.CodeRes.CodeOk).json({
//         code: STATUS.CodeRes.CodeOk,
//         data: lodash.omit(result.toObject()),
//         message: STATUS.MessageRes.status200,
//       });
//     }
//   } catch (e) {
//     res.status(STATUS.CodeRes.CodeCatchErorr).json({
//       code: STATUS.CodeRes.CodeCatchErorr,
//       message: e.message,
//     });
//   }
// };


const updateSubjCombination = async (req, res) => {
  try {
    const { idUserLatestEdit, percents, totalCredits } = req.body;

    if (!idUserLatestEdit) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401,
      });
    }

    const findSubjCom = await SubjectCombination.findOne({ _id: req.params.id });
    if (!findSubjCom) {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: STATUS.MessageRes.status403,
      });
    }

    let data = {
      ...req.body,
      listIdUserEdited: [...(findSubjCom.listIdUserEdited || []), idUserLatestEdit],
      createdBy: findSubjCom.createdBy || "",
      
    };

    const findUserForEdit = await USER.findOne({ _id: idUserLatestEdit });
    if (!findUserForEdit) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405,
      });
    }
    data.percents = percents;
    data.totalCredits = totalCredits;
    const result = await SubjectCombination.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: lodash.omit(data, "createdBy") },
      { new: true }
    );

    return res.status(STATUS.CodeRes.CodeOk).json({
      code: STATUS.CodeRes.CodeOk,
      data: lodash.omit(result.toObject()),
      message: STATUS.MessageRes.status200,
    });
  } catch (e) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
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
