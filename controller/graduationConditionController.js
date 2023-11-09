const lodash = require("lodash");
const GraduationCondition = require("../models/graduationConditionModel");
const Overview = require('../models/overviewModel');

const getAllGraduationConditions = async (req, res) => {
  try {
    let data = await GraduationCondition.find()
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

const getGraduationConditionsById = async (req, res) => {
  try {
    let data = await GraduationCondition.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing id in request parameters',
      })
      return;
    }
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

const createGraduationCondition = async (req, res) => {
  try {
    let { id, name, overViewReference } = req.body;
    const findGraduationCondition = await GraduationCondition.findOne({ id: id });
    if (!id || !name || !overViewReference) {
      res.status(401).json({
        code: 401,
        message: 'Missing data',
      });
      return;
    }
    if (!findGraduationCondition) {
      let newGraduationCondition = new GraduationCondition({
        id: id,
        name: name,
        overViewReference: overViewReference,
      })
      const findOverviewRef = Overview.findOne({ id: overViewReference });
      if (findOverviewRef) {
        let result = await newGraduationCondition.save();
        res.status(200).json({
          code: 200,
          data: lodash.omit(result.toObject()),
          message: "OK",
        });
        return;
      } else {
        res.status(402).json({
          code: 402,
          message: 'Invalid overview id provided',
        })
      }
    } else {
      res.status(400).json({
        code: 400,
        message: 'Existing graduation condition',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const updateGraduationCondition = async (req, res) => {
  const findGraduationCondition = await GraduationCondition.findOne({ _id: req.params.id });
  const findOverview = await Overview.findOne({ _id: req.body.overViewReference });
  const data = req.body;
  //console.log(data);
  //console.log(findOverview);
  if (!findOverview) {
    res.status(403).json({
      code: 403,
      message: 'Invalid overview id provided',
    })
    return;
  }
  if (findGraduationCondition) {
    if (data) {

      const temp = await GraduationCondition.updateOne({ $set: lodash.omit(req.body, 'id') });
      console.log(temp);
      let result = await GraduationCondition.findOne({ _id: req.params.id });
      if (result) {
        res.status(200).json({
          code: 200,
          data: lodash.omit(result.toObject()),
          message: 'OK',
        });
      } else {
        res.status(500).json({
          code: 500,
          message: 'Failed to retrieve updated data',
        });
      }
      return;
    } else {
      res.status(401).json({
        code: 401,
        message: 'Missing data',
      })
      return;
    }
  } else {
    res.status(400).json({
      code: 400,
      message: 'Non exist graduation condition'
    })
  }

}

const deleteAllGraduationCondition = async (req, res) => {
  try {
    let result = await GraduationCondition.deleteMany({})
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      })
    } else {
      res.status(400).json({
        code: 400,
        message: 'Graduation Condition is empty',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const deleteGraduationById = async (req, res) => {
  try {
    const findGraduationCondition = await GraduationCondition.deleteOne({ id: req.body.id })
    if (!req.body.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing data in body',
      })
      return;
    }
    if (findGraduationCondition.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      })
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non exist data',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

module.exports = {
  getAllGraduationConditions,
  getGraduationConditionsById,
  createGraduationCondition,
  updateGraduationCondition,
  deleteAllGraduationCondition,
  deleteGraduationById,
}