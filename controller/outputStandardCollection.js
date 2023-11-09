const lodash = require("lodash");
const OutputStanadard = require("../models/outputStandard");
const OutputType = require("../models/outputTypeModel");
const Res = require("../utils/ResStatus");

const getAllOutputStandard = async (req, res) => {
  try {
    let data = await OutputStanadard.find();
    res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: data,
      message: Res.MessageRes.status200,
    })
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
};

const getOutputStandardById = async (req, res) => {
  try {
    let findOutputStandard = await OutputStanadard.findOne({ _id: req.params.id });
    if (!req.params.id) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401,
      })
    }
    return res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: findOutputStandard,
      message: Res.MessageRes.status200,
    });
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

const createOutputStandard = async (req, res) => {
  try {
    const findOutputStandard = await OutputStanadard.findOne({ id: req.body.id });
    const findOutputType = await OutputType.findOne({ _id: req.body.outputTypeId });
    let {
      id,
      title,
      outputTypeId
    } = req.body;
    if (!findOutputType) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403 + ' in output type: ' + req.body.outputTypeId,
      })
    }
    if (!id || !title || !outputTypeId) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401,
      })
    }
    
    if (!findOutputStandard) {
      const newOutputStandard = new OutputStanadard({
        id: id,
        title: title,
        outputTypeId: outputTypeId,
      });
      let result = await newOutputStandard.save();
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
      message: err,
    })
  }
}

const updateOutputStandard = async (req, res) => {
  try {
    let findOutputStandard = await OutputStanadard.findOne({ _id: req.params.id });
    let data = req.body;
    if (!data.title || !data.outputTypeId) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401
      })
    }
    if (findOutputStandard) {

      await findOutputStandard.updateOne({ $set: lodash.omit(data, 'id') });
      let result = await OutputStanadard.findOne({ _id: req.params.id });
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        data: result,
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
      message: err,
    })
  }
}

const deleteAllOutputStandard = async (req, res) => {
  try {
    let result = await OutputStanadard.deleteMany({});
    if (result.deletedCount > 0){
      res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        message: Res.MessageRes.status200,
      })
    } else {
      res.status(Res.CodeRes.CodeEmptyCollection).json({
        code: Res.CodeRes.CodeEmptyCollection,
        message: Res.MessageRes.status404,
      })
    }
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

const deleteById = async (req, res) => {
  try {
    const result = await OutputStanadard.deleteOne({id: req.body.id});
    if (!req.body.id) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401, 
      })
    }
    if (result.deletedCount > 0) {
      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
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
      message: err,
    })
  }
}
module.exports = {
  getAllOutputStandard,
  getOutputStandardById,
  createOutputStandard,
  updateOutputStandard,
  deleteAllOutputStandard,
  deleteById
}