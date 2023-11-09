const lodash = require("lodash");
const Enroll = require("../models/enrollModel");
const ResStatus = require("../utils/ResStatus");


const getAllEnroll = async (req, res) => {
  try {
    let data = await Enroll.find();
    res.status(ResStatus.CodeRes.CodeOk).json({
      code: ResStatus.CodeRes.CodeOk,
      data: data,
      message: ResStatus.MessageRes.status200,
    });
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

const getEnrollById = async (req, res) => {
  try {
    let data = await Enroll.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401,
      })
    }
    res.status(ResStatus.CodeRes.CodeOk).json({
      code: ResStatus.CodeRes.CodeOk,
      data: data,
      message: ResStatus.MessageRes.status200,
    })
    return;
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

const createNewEnroll = async (req, res) => {
  try {
    let { id, title } = req.body;
    const findEnroll = await Enroll.findOne({ id: id })


    if (!findEnroll) {
      console.log(id, title);
      let enroll = new Enroll(
        {
          id: id,
          title: title,
        }
      )
      let result = await enroll.save();
      res.status(ResStatus.CodeRes.CodeOk).json({
        code: CodeRes.CodeOk,
        data: lodash.omit(result.toObject()),
        message: ResStatus.MessageRes.status200,
      });
      return;
    }
    if (!title || !id) {
      res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401,
      })
    }
    else {
      res.status(ResStatus.CodeRes.CodeExistData).json({
        code: ResStatus.CodeRes.CodeExistData,
        message: ResStatus.MessageRes.status400,
      })
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

const updateEnroll = async (req, res) => {
  try {
    let enroll = await Enroll.findOne({ _id: req.params.id });
    let data = req.body;
    if (enroll) {
      if (data) {
        if (data.id) {
          res.status(ResStatus.CodeRes.CodeUnableUpdateId).json({
            code: ResStatus.CodeRes.CodeUnableUpdateId,
            message: ResStatus.MessageRes.status402
          })
        }
        await enroll.updateOne({ $set: lodash.omit(req.body, 'id') });
        let dataEnrollNew = await Enroll.findOne({ _id: req.params.id });
        res.status(ResStatus.CodeRes.CodeOk).json({
          code: ResStatus.CodeRes.CodeOk,
          data: lodash.omit(dataEnrollNew.toObject()),
          message: ResStatus.MessageRes.status200,
        })
      } else {
        res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
          code: ResStatus.CodeRes.CodeMissingRequiredData,
          message: ResStatus.MessageRes.status401,
        })
      }
    } else {
      res.status(ResStatus.CodeRes.CodeNonExistData).json({
        code: ResStatus.CodeRes.CodeNonExistData,
        message: ResStatus.MessageRes.status403,
      })
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      menubar: err,
    })
  }

}

const deleteAllEnroll = async (req, res) => {
  try {
    let result = await Enroll.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(ResStatus.CodeRes.CodeOk).json({
        code: ResStatus.CodeRes.CodeOk,
        message: ResStatus.MessageRes.status200,
      })
    }
    else {
      res.status(ResStatus.CodeRes.CodeEmptyCollection).json({
        code: ResStatus.CodeRes.CodeEmptyCollection,
        message: ResStatus.MessageRes.status404,
      });
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

const deleteEnrollById = async (req, res) => {
  try {
    let findEnroll = await Enroll.deleteOne({ id: req.body.id })
    if (!req.body.id) {
      res.status(ResStatus.CodeRes.CodeMissingRequiredData).json({
        code: ResStatus.CodeRes.CodeMissingRequiredData,
        message: ResStatus.MessageRes.status401,
      })
      return;
    }
    if (findEnroll.deletedCount > 0) {
      res.status(ResStatus.CodeRes.CodeOk).json({
        code: ResStatus.CodeRes.CodeOk,
        message: ResStatus.MessageRes.status200,
      });
      return;
    } else {
      res.status(ResStatus.CodeRes.CodeNonExistData).json({
        code: ResStatus.CodeRes.CodeNonExistData,
        message: ResStatus.MessageRes.status403,
      });
      return;
    }
  } catch (err) {
    res.status(ResStatus.CodeRes.CodeCatchErorr).json({
      code: ResStatus.CodeRes.CodeCatchErorr,
      message: err,
    })
  }
}

module.exports = { getAllEnroll, getEnrollById, createNewEnroll, updateEnroll, deleteAllEnroll, deleteEnrollById }