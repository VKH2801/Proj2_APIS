const lodash = require("lodash");
const STATUS = require("../utils/ResStatus");
const SubjectDetails = require("../models/subjectDetailModel");
const SubjectCombination = require("../models/subjectCombinationModel");
const OutputStandard = require("../models/outputStandard");
const ClassificationScale = require("../models/classificationScaleModel");
const User = require("../models/userModel");

const getAllSubjectDetials = async (req, res) => {
  try {
    const findAll = await SubjectDetails.find();
    if (findAll) {
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: findAll,
        message: "OK",
      });
    } else {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Non exist data in Subject details",
      });
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const getByIdSubjectDetails = async (req, res) => {
  try {
    const findSubjectInfo = await SubjectDetails.findById({
      _id: req.params.id,
    }).populate('idSubjectCombination').populate('idOutputStandard').populate('idClassificationScale');
    if (findSubjectInfo) {
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        data: findSubjectInfo,
        message: "OK",
      });
    } else {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Non exist data in Subject details",
      });
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const createNewSubjectDetails = async (req, res) => {
  try {
    let data = req.body;
    //console.log(data);
    if (
      !data.subjectCode ||
      !data.title ||
      !data.idSubjectCombination ||
      !data.idOutputStandard ||
      !data.idClassificationScale ||
      !data.createdBy
    ) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: "Missing required data for creating new Subject Details",
      });
    }

    const findSubjectCombination = await SubjectCombination.findOne({
      _id: data.idSubjectCombination,
    });
    if (!findSubjectCombination) {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Invalid id for subject combination",
      });
    }

    const findOutputStandard = await OutputStandard.findOne({
      _id: data.idOutputStandard,
    });
    if (!findOutputStandard) {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Invalid id for Output standard",
      });
    }

    const findClassificationScale = await ClassificationScale.findOne({
      _id: data.idClassificationScale,
    });
    if (!findClassificationScale) {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Invalid id for Classification scale",
      });
    }

    const findUser = await User.findOne({ _id: data.createdBy });
    if (!findUser) {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Invalid id user to create",
      });
    }

    const newSubjectDetails = new SubjectDetails({
      subjectCode: data.subjectCode,
      title: data.title,
      theoryCredits: data.theoryCredits ? data.theoryCredits : 0,
      practiseCredits: data.practiseCredits ? data.practiseCredits : 0,
      optionCredits: data.optionCredits ? data.optionCredits : "",
      idSubjectCombination: findSubjectCombination,
      idOutputStandard: findOutputStandard,
      idClassificationScale: findClassificationScale,
      englishTitle: data.englishTitle ? data.englishTitle : "",
      synopsis: data.synopsis ? data.synopsis : "",
      idUserLatestEdit: findUser,
      listIdUserEdited: [findUser],
      createdBy: findUser,
    });
    const result = await newSubjectDetails.save();
    return res.status(STATUS.CodeRes.CodeOk).json({
      code: STATUS.CodeRes.CodeOk,
      data: result,
      message: "OK",
    });
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const updateSubjectsDetails = async (req, res) => {
  try {
    let data = req.body;
    if (!data.idUserLatestEdit) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        data: STATUS.CodeRes.CodeMissingRequiredData,
        message: "Missing required data: idUserLatestEdit",
      });
    }

    const findSubjectDetailsInfo = await SubjectDetails.findOne({
      _id: req.params.id,
    });
    if (!data.idUserLatestEdit) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: "Missing idUserLatestEdit",
      });
    }

    if (data.idSubjectCombination) {
      if (
        data.idSubjectCombination !==
        findSubjectDetailsInfo.idSubjectCombination
      ) {
        const findSubjectCombinationInfo = await SubjectCombination.findOne({
          _id: data.idSubjectCombination,
        });
        if (!findSubjectCombinationInfo) {
          return res.status(STATUS.CodeRes.CodeNonExistData).json({
            code: STATUS.CodeRes.CodeNonExistData,
            message: "Invalid idSubjectCombination for update",
          });
        } else {
          data.idSubjectCombination = findSubjectCombinationInfo;
        }
      }
    } else {
      data.idSubjectCombination = findSubjectDetailsInfo.idSubjectCombination;
    }

    if (data.idOutputStandard) {
      if (data.idOutputStandard !== findSubjectDetailsInfo.idOutputStandard) {
        const findOutputStandardInfo = await OutputStandard.findOne({
          _id: data.idOutputStandard,
        });
        if (!findOutputStandardInfo) {
          return res.status(STATUS.CodeRes.CodeNonExistData).json({
            code: STATUS.CodeRes.CodeNonExistData,
            message: "Invalid idOutputStandard for update",
          });
        } else {
          data.idOutputStandard = findOutputStandardInfo;
        }
      }
    } else {
      data.idOutputStandard = findSubjectDetailsInfo.idOutputStandard;
    }

    if (data.idClassificationScale) {
      if (
        data.idClassificationScale !==
        findSubjectDetailsInfo.idClassificationScale
      ) {
        const findClassificationScaleInfo = await ClassificationScale.findOne({
          _id: data.idClassificationScale,
        });
        if (!findClassificationScaleInfo) {
          return res.status(STATUS.CodeRes.CodeNonExistData).json({
            code: STATUS.CodeRes.CodeNonExistData,
            message: "Invalid idClassificationScale for update",
          });
        } else {
          data.idClassificationScale = findClassificationScaleInfo;
        }
      }
    } else {
      data.idClassificationScale = findSubjectDetailsInfo.idClassificationScale;
    }

    if (findSubjectDetailsInfo) {
      data.listIdUserEdited = findSubjectDetailsInfo.listIdUserEdited;
      data.createdBy = findSubjectDetailsInfo.createdBy;

      const findUserForEdit = await User.findOne({
        _id: data.idUserLatestEdit,
      });
      if (!findUserForEdit) {
        return res.status(STATUS.CodeRes.CodeUserInvalid).json({
          code: STATUS.CodeRes.CodeUserInvalid,
          message: "Invalid id user for update",
        });
      }

      if (!data.listIdUserEdited.includes(data.idUserLatestEdit)) {
        data.listIdUserEdited.push(data.idUserLatestEdit);
      }

      const result = await SubjectDetails.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: lodash.omit(data, "_id") },
        { new: true }
      );
      return res.status(200).json({
        code: 200,
        data: result,
        message: "OK",
      });
    } else {
      return res.status(401).json({
        code: 401,
        message: "Non exist subject details",
      });
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const deleteAllSubjectsDetails = async (req, res) => {
  try {
    const result = await SubjectDetails.deleteMany({});
    if (result.deletedCount > 0) {
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        message: "OK",
      });
    } else {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Non exist data in Subject details",
      });
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const deleteByIdSubjectDetails = async (req, res) => {
  try {
    const result = await SubjectDetails.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      return res.status(STATUS.CodeRes.CodeOk).json({
        code: STATUS.CodeRes.CodeOk,
        message: "OK",
      });
    } else {
      return res.status(STATUS.CodeRes.CodeNonExistData).json({
        code: STATUS.CodeRes.CodeNonExistData,
        message: "Non exist data in Subject details",
      });
    }
  } catch (err) {
    res.status(STATUS.CodeRes.CodeCatchErorr).json({
      code: STATUS.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

module.exports = {
  getAllSubjectDetials,
  getByIdSubjectDetails,
  createNewSubjectDetails,
  updateSubjectsDetails,
  deleteAllSubjectsDetails,
  deleteByIdSubjectDetails,
};
