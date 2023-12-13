const lodash = require("lodash");
const OutputStanadard = require("../models/outputStandard");
const OutputType = require("../models/outputTypeModel");
const User = require("../models/userModel");
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
      message: err.message,
    })
  }
};

const getOutputStandardById = async (req, res) => {
  try {
    let findOutputStandard = await OutputStanadard.findOne({ _id: req.params.id }).populate('idOutputType');
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
      message: err.message,
    })
  }
}

const createOutputStandard = async (req, res) => {
  try {
    const findOutputType = await OutputType.findOne({ _id: req.body.idOutputType });
    let {
      id,
      title,
      content,
      idOutputType,
      createdBy,
    } = req.body;
    const findValidOutStand = await OutputStanadard.findOne({ id: id});
    if (findValidOutStand) {
      return res.status(401).json({
        code: 401,
        message: 'id output standard is unique',
      })
    }
    if (!findOutputType) {
      return res.status(Res.CodeRes.CodeNonExistData).json({
        code: Res.CodeRes.CodeNonExistData,
        message: Res.MessageRes.status403 + ' in output type: ' + req.body.idOutputType,
      })
    }

    if (!idOutputType || !createdBy) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401,
      })
    }

    const findUser = await User.findById({_id: createdBy});
    if (!findUser) {
      return res.status(401).json({
        data: 401,
        message: 'Invalid user',
      })
    }

    const newOutputStandard = new OutputStanadard({
      id: id,
      title: title,
      content: content,
      idOutputType: findOutputType,
      idUserLatestEdit: findUser,
      listIdUserEdited: [findUser],
      createdBy: findUser,
    });
    let result = await newOutputStandard.save();
    return res.status(Res.CodeRes.CodeOk).json({
      code: Res.CodeRes.CodeOk,
      data: result,
      message: Res.MessageRes.status200,
    })
  } catch (err) {
    res.status(Res.CodeRes.CodeCatchErorr).json({
      code: Res.CodeRes.CodeCatchErorr,
      message: err.message,
    })
  }
}

const updateOutputStandard = async (req, res) => {
  try {
    let findOutputStandard = await OutputStanadard.findOne({ _id: req.params.id });
    let data = req.body;
    if (!data.idUserLatestEdit) {
      return res.status(Res.CodeRes.CodeMissingRequiredData).json({
        code: Res.CodeRes.CodeMissingRequiredData,
        message: Res.MessageRes.status401
      })
    }
    const findUser = await User.findOne({ _id: data.idUserLatestEdit});
    if (!findUser) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid user',
      })
    }
    if (findOutputStandard) {
      data.listIdUserEdited = findOutputStandard.listIdUserEdited;
      data.createdBy = findOutputStandard.createdBy;
      if (!data.listIdUserEdited.includes(data.idUserLatestEdit)) {
        data.listIdUserEdited.push(data.idUserLatestEdit);
      }
      const findOutputType = await OutputStanadard.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: lodash.omit(data, "id") },
        { new: true }
      ).populate('idOutputType').populate("idUserLatestEdit").populate("createdBy");
      // const findOutputType = await OutputType.findOne({ _id:  findOutputStandard.idOutputType}).populate('idOutputType').populate("idUserLatestEdit").populate("createdBy");

      return res.status(Res.CodeRes.CodeOk).json({
        code: Res.CodeRes.CodeOk,
        data: findOutputType,
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
      message: err.message,
    })
  }
}

const deleteById = async (req, res) => {
  try {
    const result = await OutputStanadard.deleteOne({_id: req.params.id});
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
      message: err.message,
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