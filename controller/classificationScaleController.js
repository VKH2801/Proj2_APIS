const lodash = require("lodash");
const Res = require("../utils/ResStatus");
const ClassificationScale = require("../models/classificationScaleModel");
const OutputType = require("../models/outputTypeModel");
const User = require("../models/userModel");

const getAllClassifications = async (req, res) => {
  try {
    const findCls = await ClassificationScale.find().populate("idOutputType");
    return res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: findCls,
      message: Res.MessageRes.status200,
    });
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const getClassifyById = async (req, res) => {
  try {
    const findCls = await ClassificationScale.findOne({
      _id: req.params.id,
    }).populate("idOutputType");
    if (findCls) {
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        data: findCls,
        message: Res.MessageRes.status200,
      });
    } else {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403,
      });
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const createClassifyScale = async (req, res) => {
  try {
    let data = req.body;
    if (!data.idOutputType || !data.createdBy) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message:
          Res.MessageRes.status401 + ": idOutputType or createdBy not provided",
      });
    }

    const findOutputType = await OutputType.findOne({ _id: data.idOutputType });
    if (!findOutputType) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message:
          Res.MessageRes.status403 +
          " output type with id: " +
          req.body.idOutputType,
      });
    }

    const findUser = await User.findOne({ _id: data.createdBy });
    if (!findUser) {
      return res.status(401).json({
        code: 401,
        message: "Invalid user for create",
      });
    }
    let newCls = new ClassificationScale({
      code: data.code ?? "",
      level: data.level ?? 0,
      nameLevel: data.nameLevel ?? "",
      discription: data.discription ?? "",
      idOutputType: findOutputType,
      idUserLatestEdit: findUser,
      listIdUserEdited: [findUser],
      createdBy: findUser,
    });
    const result = await newCls.save();
    //const result = await ClassificationScale.findOne({ idLevel: req.body.idLevel });
    return res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: result,
      message: Res.MessageRes.status200,
    });
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

// const updateCls = async (req, res) => {
//   try {
//     const findCls = await ClassificationScale.findOne({ _id: req.params.id });

//     if (!req.body.idUserLatestEdit) {
//       return res.status(Res.CodeRes.CodeMissingRequiredData).json({
//         code: Res.CodeRes.CodeMissingRequiredData,
//         message: Res.MessageRes.status401,
//       });
//     }

//     const outputTypeId = req.body.idOutputType ? req.body.idOutputType : findCls.idOutputType;
//     const findOutputType = await OutputType.findOne({ _id: outputTypeId });
//     if (!findOutputType) {
//       return res.status(Res.CodeRes.CodeNonExistData).json({
//         code: Res.CodeRes.CodeNonExistData,
//         message:
//           Res.MessageRes.status403 +
//           " output type with id: " +
//           req.body.idOutputType,
//       });
//     }

//     const findUser = await User.findById({ _id: req.body.idUserLatestEdit });
//     if (!findUser) {
//       return res.status(Res.CodeRes.CodeNonExistData).json({
//         code: Res.CodeRes.CodeNonExistData,
//         message: Res.MessageRes.status403,
//       });
//     }

//     if (findCls) {
//       const result = await ClassificationScale.findByIdAndUpdate(
//         { _id: req.params.id },
//         { $set: lodash.omit(req.body, "_id") },
//         { new: true }
//       ).populate("idOutputType");

//       return res.status(Res.CodeRes.CodeOk).json({
//         code: Res.CodeRes.CodeOk,
//         data: lodash.omit(result.toObject()),
//         message: Res.MessageRes.status200,
//       });
//     } else {
//       return res.status(Res.CodeRes.CodeNonExistData).json({
//         code: Res.CodeRes.CodeNonExistData,
//         message: Res.MessageRes.status403 + " with id: " + req.params.id,
//       });
//     }
//   } catch (err) {
//     res.status(Res.CodeRes.CodeCatchErorr).json({
//       code: Res.CodeRes.CodeCatchErorr,
//       message: err.message,
//     });
//   }
// };

const updateCls = async (req, res) => {
  try {
    const findCls = await ClassificationScale.findOne({ _id: req.params.id });

    if (!findCls) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403 + " with id: " + req.params.id,
      });
    }

    if (!req.body.idUserLatestEdit) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401,
      });
    }

    const outputTypeId = req.body.idOutputType
      ? req.body.idOutputType
      : findCls.idOutputType;
    const findOutputType = await OutputType.findOne({ _id: outputTypeId });
    if (!findOutputType) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message:
          Res.MessageRes.status403 +
          " output type with id: " +
          req.body.idOutputType,
      });
    }

    const findUser = await User.findById({ _id: req.body.idUserLatestEdit });
    if (!findUser) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403,
      });
    }

    req.body.listIdUserEdited = findCls.listIdUserEdited;
      req.body.createdBy = findCls.createdBy;
      if (!req.body.listIdUserEdited.includes(req.body.idUserLatestEdit)) {
        req.body.listIdUserEdited.push(req.body.idUserLatestEdit);
      }
    
    // Update the code here to use lodash.omit and populate the idOutputType
    const data = lodash.omit(req.body, "_id");
    data.idOutputType = outputTypeId; // Assign the correct idOutputType

    const result = await ClassificationScale.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    ).populate("idOutputType");

    return res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: lodash.omit(result.toObject()),
      message: Res.MessageRes.status200,
    });
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await ClassificationScale.deleteMany({});
    if (result.deletedCount > 0) {
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        message: Res.MessageRes.status200,
      });
    } else {
      return res.status(Res.CodeRes.CodeEmptyCollection).json({
        code: Res.CodeRes.CodeEmptyCollection,
        message: Res.MessageRes.status404,
      });
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};

const deleteWithId = async (req, res) => {
  try {
    const result = await ClassificationScale.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        message: Res.MessageRes.status200,
      });
    } else {
      res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403,
      });
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    });
  }
};
module.exports = {
  getAllClassifications,
  getClassifyById,
  createClassifyScale,
  updateCls,
  deleteAll,
  deleteWithId,
};
