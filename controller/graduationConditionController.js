const lodash = require("lodash");
const GraduationCondition = require("../models/graduationConditionModel");
const Overview = require("../models/overviewModel");
const User = require("../models/userModel");

const getAllGraduationConditions = async (req, res) => {
  try {
    let data = await GraduationCondition.find();
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

const getGraduationConditionsById = async (req, res) => {
  try {
    let data = await GraduationCondition.findOne({ _id: req.params.id }).populate('idOverView');
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: "Missing id in request parameters",
      });
      return;
    }
    if (data) {
      // const findUserCreate = await User.findOne({_id: data.createdBy});
      // const findIserUpdate = await User.findOne({_id: data.idUserLatestEdit});
      // const findOverView = await Overview.findOne({_id: data.idOverView});
      // const result = {
      //   title: data.title ? data.title : "",
      //   content: data.content ? data.content : "",
      //   idOverView: findOverView ? findOverView : null,
      //   idUserLatestEdit: findIserUpdate ? findIserUpdate : null,
      //   listIdUserEdited: data.listIdUserEdited ? data.listIdUserEdited : [],
      //   createdBy: findUserCreate ? findUserCreate : null,
      // }
      return res.status(200).json({
        code: 200,
        data: data,
        message: "OK",
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "Non exist graduation conditions",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const createGraduationCondition = async (req, res) => {
  try {
    let { title, content, idOverView, createdBy } = req.body;
    if (!idOverView || !createdBy) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }

    const findUserCreate = await User.findOne({ _id: createdBy });
    if (!findUserCreate) {
      return res.status(404).json({
        code: 404,
        message: "Invalid user for create",
      });
    }

    const findOverviewRef = await Overview.findOne({ _id: idOverView });
    if (findOverviewRef) {
      let newGraduationCondition = new GraduationCondition({
        content: content,
        title: title ?? '',
        idOverView: findOverviewRef,
        idUserLatestEdit: findUserCreate,
        listIdUserEdited: [findUserCreate._id],
        createdBy: findUserCreate,
      });
      let result = await newGraduationCondition.save();
      res.status(200).json({
        code: 200,
        data: result,
        message: "OK",
      });
      return;
    } else {
      res.status(402).json({
        code: 402,
        message: "Invalid overview id provided",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const updateGraduationCondition = async (req, res) => {
  try {
    const findGraduationCondition = await GraduationCondition.findOne({
      _id: req.params.id,
    });

    let data = req.body;
    if (data.idOverView) {
      const findOverview = await Overview.findOne({ _id: req.body.idOverView });
      if (!findOverview) {
        res.status(403).json({
          code: 403,
          message: "Invalid overview id provided",
        });
        return;
      }
    }else {
      data.idOverView = findGraduationCondition.idOverView;
    }

    if (!data.idUserLatestEdit) {
      return res.status(405).json({
        code: 405,
        message: "Missing user id for update",
      });
    }

    const findUserForUpdate = await User.findOne({
      _id: data.idUserLatestEdit,
    });
    if (!findUserForUpdate) {
      return res.status(405).json({
        code: 405,
        message: "Nonexist user for update",
      });
    }

    if (findGraduationCondition) {
      data.createdBy = findGraduationCondition.createdBy;
      data.listIdUserEdited = findGraduationCondition.listIdUserEdited;
      if (!data.listIdUserEdited.includes(data.idUserLatestEdit)) {
        data.listIdUserEdited.push(data.idUserLatestEdit);
      }

      const result = await GraduationCondition.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: lodash.omit(data, "createdBy") },
        { new: true }
      ).populate("idOverView");
      if (result) {
        res.status(200).json({
          code: 200,
          data: result,
          message: "OK",
        });
      } else {
        res.status(500).json({
          code: 500,
          message: "Failed to retrieve updated data",
        });
      }
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: "Non exist graduation condition",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteAllGraduationCondition = async (req, res) => {
  try {
    let result = await GraduationCondition.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Graduation Condition is empty",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteGraduationById = async (req, res) => {
  try {
    const findGraduationCondition = await GraduationCondition.deleteOne({
      _id: req.params.id,
    });
    if (findGraduationCondition.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non exist data",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

module.exports = {
  getAllGraduationConditions,
  getGraduationConditionsById,
  createGraduationCondition,
  updateGraduationCondition,
  deleteAllGraduationCondition,
  deleteGraduationById,
};
