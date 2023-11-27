const lodash = require("lodash");
const Overview = require("../models/overviewModel");
const User = require("../models/userModel");
const STATUS = require("../utils/ResStatus");
const getAllOverview = async (req, res) => {
  try {
    let data = await Overview.find();
    res.status(200).json({
      code: 200,
      data: data,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};
const getOverviewById = async (req, res) => {
  try {
    let data = await Overview.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: "Missing data in request parameter",
      });
      return;
    }
    res.status(200).json({
      code: 200,
      data: data,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    });
  }
};

const createOverview = async (req, res) => {
  try {
    let {
      eduName,
      eduId,
      eduType,
      applicableSubjects,
      goalsTraining,
      goalsAfterTraining,
      perspectivesTraining,
      formOfTraining,
      degreeTraining,
      majorTraining,
      createdBy,
    } = req.body;
    let findOverviewId = await Overview.findOne({ eduId: eduId });
    let fintOverviewName = await Overview.findOne({ eduName: eduName });
    if (!createdBy) {
      return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401 + ": createdBy",
      });
    }
    const findUserForCreate = await User.findOne({ _id: createdBy });
    if (!findUserForCreate) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405 + "for creation",
      });
    }
    if (findOverviewId) {
      res.status(401).json({
        code: 401,
        message: "Existing id Overview",
      });
      return;
    }
    if (fintOverviewName) {
      res.status(402).json({
        code: 402,
        message: "Existing name Overview",
      });
      return;
    }
    if (
      !eduName ||
      !eduId ||
      !eduType ||
      !applicableSubjects ||
      !goalsTraining ||
      !goalsAfterTraining ||
      !perspectivesTraining ||
      !formOfTraining ||
      !degreeTraining ||
      !majorTraining
    ) {
      res.status(400).json({
        code: 400,
        message: "Missing data",
      });
      return;
    } else {
      let newOverview = new Overview({
        eduName: eduName,
        eduId: eduId,
        eduType: eduType,
        applicableSubjects: applicableSubjects,
        goalsTraining: goalsTraining,
        goalsAfterTraining: goalsAfterTraining,
        perspectivesTraining: perspectivesTraining,
        formOfTraining: formOfTraining,
        degreeTraining: degreeTraining,
        majorTraining: majorTraining,
        idUserLatestEdit: findUserForCreate._id,
        listIdUserEdited: [findUserForCreate._id],
        createdBy: findUserForCreate._id,
      });
      const result = await newOverview.save();
      res.status(200).json({
        code: 200,
        data: lodash.omit(result.toObject()),
        message: "OK",
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

const updateOverview = async (req, res) => {
  try {
    const { idUserLatestEdit, createdBy } = req.body;
    if (!idUserLatestEdit) {
      return res.status(STATUS.CodeMissingRequiredData).json({
        code: STATUS.CodeRes.CodeMissingRequiredData,
        message: STATUS.MessageRes.status401 + ": idUserLatestEdit",
      });
    }

    const findUserEdit = await User.findOne({ _id: idUserLatestEdit });
    if (!findUserEdit) {
      return res.status(STATUS.CodeRes.CodeUserInvalid).json({
        code: STATUS.CodeRes.CodeUserInvalid,
        message: STATUS.MessageRes.status405 + "for innovation",
      });
    }

    let findOverview = await Overview.findOne({ _id: req.params.id });
    const findUserCreated = await User.findOne({
      _id: req.params.findOverview.createdBy,
    });
    if (createdBy !== findOverview.createdBy) {
      return res.status(STATUS.CodeRes.CodeUnableUpdateId).json({
        code: STATUS.CodeRes.CodeUnableUpdateId,
        message: "Unable to update createdBy id",
      });
    }
    if (findOverview) {
      if (!req.body) {
        req.body.listIdUserEdited = findOverview.listIdUserEdited
          ? findOverview.listIdUserEdited
          : [];
        req.body.createdBy = findOverview.createdBy ? findOverview.createdBy : "";
        if (!req.body.listIdUserEdited.includes(idUserLatestEdit)) {
          req.body.listIdUserEdited.push(findUserEdit._id);
        }
        const result = await Overview.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: lodash.omit(req.body, "eduId") },
          { new: true }
        );
        const responseData = {
          _id: result._id,
          eduName: result.eduName,
          eduId: result.eduId,
          eduType: result.eduType,
          applicableSubjects: result.applicableSubjects,
          formOfTraining: {
            listForm: result.formOfTraining.listForm
              ? result.formOfTraining.listForm
              : "",
            creditsNumber: result.formOfTraining.creditsNumber
              ? result.formOfTraining.creditsNumber
              : 0,
            time: result.formOfTraining.time ? result.formOfTraining.time : "",
          },
          goalsTraining: result.goalsTraining ? result.goalsTraining : "",
          goalsAfterTraining: result.goalsAfterTraining
            ? result.goalsAfterTraining.goalsAfterTraining
            : "",
          perspectivesTraining: result.perspectivesTraining
            ? result.perspectivesTraining
            : "",
          degreeTraining: result.degreeTraining ? result.degreeTraining : "",
          majorTraining: result.majorTraining ? result.majorTraining : "",
          idUserLatestEdit: findUserEdit,
          listIdUserEdited: result.listIdUserEdited
            ? result.listIdUserEdited
            : "",
          createdBy: findUserCreated ? findUserCreated : result.createdBy,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        };
        return res.status(200).json({
          code: 200,
          data: lodash.omit(responseData.toObject()),
          message: "OK",
        });
      } else {
        return res.status(STATUS.CodeRes.CodeMissingRequiredData).json({
          code: STATUS.CodeRes.CodeMissingRequiredData,
          message: STATUS.MessageRes.status401,
        });
      }
    } else {
      return res.status(400).json({
        code: 400,
        message: "Overview not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};
const deleteAllOverview = async (req, res) => {
  try {
    let result = await Overview.deleteMany({});
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

const deleteByIdOverview = async (req, res) => {
  try {
    let overview = await Overview.deleteOne({ eduId: req.body.eduId });
    console.log(overview);
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
  getAllOverview,
  getOverviewById,
  createOverview,
  updateOverview,
  deleteAllOverview,
  deleteByIdOverview,
};
