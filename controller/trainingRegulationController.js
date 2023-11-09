const lodash = require("lodash");
const TrainingRegulation = require('../models/trainingRegulationModel');

const getAllTrainingReg = async (req, res) => {
  try {
    let data = await TrainingRegulation.find();
    res.status(200).json({
      code: 200,
      data: data,
      message: 'OK',
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const getTrainingById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing Id in request parameter',
      })
      return;
    }
    let data = await TrainingRegulation.findOne({ _id: req.params.id });
    res.status(200).json({
      code: 200,
      data: lodash.omit(data.toObject()),
      message: 'OK'
    })
    return;
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const createNewTrainingReg = async (req, res) => {
  try {
    let { id, title } = req.body;
    if (!title || !id) {
      res.status(401).json({
        code: 401,
        message: 'Missing data'
      })
      return;
    }

    const findTraining = await TrainingRegulation.findOne({ id: id })
    if (!findTraining) {
      console.log(id, title);
      let trainingReg = new TrainingRegulation(
        {
          id: id,
          title: title,
        }
      )
      let result = await trainingReg.save();
      res.status(200).json({
        code: 200,
        data: lodash.omit(result.toObject()),
        message: "OK",
      });
      return;
    }
    else {
      res.status(400).json({
        code: 400,
        message: 'Existing training regulation data'
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const updateTrainingReg = async (req, res) => {
  try {
    let trainingReg = await TrainingRegulation.findOne({ _id: req.params.id });
    //console.log(trainingReg);
    let data = req.body;
    if (!data) {
      res.status(401).json({
        code: 401,
        message: 'Missing data',
      })
      return;
    }
    if (data.id !== trainingReg.id) {
      res.status(402).json({
        code: 402,
        message: 'Unable update id - It a unique key',
      })
      return;
    }
    if (trainingReg) {
      await trainingReg.updateOne({ $set: lodash.omit(req.body, 'id') });
      let data = await TrainingRegulation.findOne({ _id: req.params.id });
      console.log(data);
      res.status(200).json({
        code: 200,
        data: lodash.omit(data.toObject()),
        message: 'OK',
      })
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existent training regulation',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }

}

const deleteAllTrainingReg = async (req, res) => {
  try {
    let result = await TrainingRegulation.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      })
    }
    else {
      res.status(400).json({
        code: 400,
        message: 'Training Regulation is empty',
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const deleteTrainingRegById = async (req, res) => {
  try {
    let findTrainingReg = await TrainingRegulation.deleteOne({ id: req.body.id })
    if (!req.body.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing data in body',
      })
      return;
    }
    if (findTrainingReg.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      });
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existing data',
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

module.exports = {
  getAllTrainingReg,
  getTrainingById,
  createNewTrainingReg,
  updateTrainingReg,
  deleteAllTrainingReg,
  deleteTrainingRegById,
}