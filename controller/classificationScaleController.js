const lodash = require("lodash");
const Res = require("../utils/ResStatus");
const ClassificationScale = require("../models/classificationScaleModel");
const OutputType = require("../models/outputTypeModel");

const getAllClassifications = async (req, res) => {
  try {
    const findCls = await ClassificationScale.find();
    return res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: findCls,
      message: Res.MessageRes.status200,
    })
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }


}

const getClassifyById = async (req, res) => {
  try {
    const findCls = await ClassificationScale.findOne({ _id: req.params.id });
    if (findCls) {
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        data: findCls,
        message: Res.MessageRes.status200,
      })
    } else {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403,
      })
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}

const createClassifyScale = async (req, res) => {
  try {
    const findInvalidClsScaleId = await ClassificationScale.findOne({ idLevel: req.body.idLevel })
    if (!req.body.idLevel) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401 + ': id level not provided',
      })
    }
    if (!req.body) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401
      })
    }

    const findOutputType = await OutputType.findOne({ _id: req.body.idOutputType });
    if (!findOutputType) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403 + 'output type with id: ' + req.body.idOutputType,
      })
    }
    if (!findInvalidClsScaleId) {
      let newCls = new ClassificationScale({
        idLevel: req.body.idLevel,
        level: req.body.level,
        nameLevel: req.body.nameLevel,
        discription: req.body.discription,
        idOutputType: req.body.idOutputType,
      })
      await newCls.save();
      const result = await ClassificationScale.findOne({ idLevel: req.body.idLevel });
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        data: result,
        message: Res.MessageRes.status200,
      })
    } else {
      return res.status(Res.CodeRes.CodeExistData).json({
        code: Res.CodeRes.CodeExistData,
        message: Res.MessageRes.status400,
      })
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}

const updateCls = async (req, res) => {
  try {
    const findCls = await ClassificationScale.findOne({_id: req.params.id});
    //console.log(findCls);
    if (!req.body.idOutputType) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401,
      })
    }
    if (req.body.idLevel !== findCls.idLevel) {
      return res.status(Res.CodeRes.CodeUnableUpdateId).json({
        code: Res.CodeRes.CodeUnableUpdateId,
        message: Res.MessageRes.status402
      })
    }
    const findOutputType = await OutputType.findOne({_id: req.body.idOutputType});
    if (!findOutputType) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403 + ' output type with id: ' + req.body.idOutputType,
      })
    }
    if (findCls) {
      await findCls.updateOne({ $set: lodash.omit(req.body, 'idLevel')});
      const result = await ClassificationScale.findOne({_id: req.params.id});
      //console.log(result);
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        data: lodash.omit(result.toObject()),
        message: Res.MessageRes.status200,
      })
    } else {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403 + ' with id: ' + req.params.id,
      })
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}


const deleteAll = async (req, res) => {
  try {
    const result = await ClassificationScale.deleteMany({});
    if (result.deletedCount > 0) {
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        message: Res.MessageRes.status200,
      })
    } else {
      return res.status(Res.CodeRes.CodeEmptyCollection).json({
        code: Res.CodeRes.CodeEmptyCollection,
        message: Res.MessageRes.status404
      })
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }

}

const deleteWithId = async (req, res) => {
  try {
    const result = await ClassificationScale.deleteOne({_id: req.params.id});
    if (result.deletedCount > 0) {
      res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        message: Res.MessageRes.status200,
      })
    } else {
      res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403,
      })
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}
module.exports = {
  getAllClassifications,
  getClassifyById,
  createClassifyScale,
  updateCls,
  deleteAll,
  deleteWithId,
}