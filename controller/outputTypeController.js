const lodash = require("lodash");
const OutputType = require("../models/outputTypeModel");

const getAllOutputTypes = async (req, res) => {
  try {
    let findOutputType = await OutputType.find();
    //console.log(findOutputType);
    res.status(200).json({
      code: 200,
      data: findOutputType,
      message: 'OK',
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
 
}

const createNewOutputType = async (req, res) => {
  try {
    const findOutputType = await OutputType.findOne({id: req.body.id});
    let {
      id,
      title,
    } = req.body;
    if (!id || !title) {
      res.status(401).json({
        code: 401,
        message: 'Missing data',
      })
      return;
    }
    if (!findOutputType) {
      const newOutputType = new OutputType({
        id: id,
        title: title,
      })
      let result = await newOutputType.save();
      res.status(200).json({
        code: 200,
        data: lodash.omit(result.toObject()),
        message: 'OK',
      })
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: 'Existing data',
      })
      return;
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const updateOutputType = async (req, res) => {
  try {
    const findOutput = await OutputType.findOne({_id: req.params.id});
  let {
    id,
    title,
  } = req.body;
  if (!title) {
    res.status(401).json({
      code: 401,
      message: 'Missing data',
    })
    return;
  }
  if (id) {
    res.status(402).json({
      code: 402,
      message: 'Unable update id - It a unique key',
    })
    return;
  }
  if (findOutput) {
    await findOutput.updateOne({ $set: lodash.omit(req.body, 'id') });
    let data = await OutputType.findOne({_id: req.params.id});
    res.status(200).json({
      code: 200,
      data: lodash.omit(data.toObject()),
      message: 'OK',
    })
  } else {
    res.status(400).json({
      code: 400,
      message: 'Non existing Output type',
    })
  }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
  
}

const deleteAllOutputTypes = async (req, res)  => {
  try {
    const result = OutputType.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK'
      })
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existing Output type',
      })
    }
  } catch (err) { 
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const deleteOutputTypesById = async (req, res) => {
  try {
    const result = await OutputType.deleteOne({ id: req.body.id });
    if (!req.body.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing data',
      });
      return;
    }
    //console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      })
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existing Output type',
      })
      return;
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    });
  }
}

module.exports = {
  getAllOutputTypes,
  createNewOutputType,
  updateOutputType,
  deleteAllOutputTypes,
  deleteOutputTypesById,
}

