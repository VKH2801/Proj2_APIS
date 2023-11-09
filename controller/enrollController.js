const lodash = require("lodash");
const Enroll = require("../models/enrollModel");

const getAllEnroll = async (req, res) => {
  try {
    let data = await Enroll.find();
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

const getEnrollById = async (req, res) => {
  try {
    let data = await Enroll.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing id request parameter',
      })
    }
    res.status(200).json({
      code: 200,
      data: data,
      message: 'OK',
    })
    return;
  } catch (err) {
    res.status(500).json({
      code: 500,
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
      res.status(200).json({
        code: 200,
        data: lodash.omit(result.toObject()),
        message: "OK",
      });
      return;
    }
    if (!title || !id) {
      res.status(401).json({
        code: 401,
        message: 'Missing required data for enroll'
      })
    }
    else {
      res.status(400).json({
        code: 400,
        message: 'Existing Enroll data'
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
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
          res.status(402).json({
            code: 402,
            message: 'Unable update id - It a unique key',
          })
        }
        await enroll.updateOne({ $set: lodash.omit(req.body, 'id') });
        let dataEnrollNew = await Enroll.findOne({ _id: req.params.id });
        res.status(200).json({
          code: 200,
          data: lodash.omit(dataEnrollNew.toObject()),
          message: 'OK',
        })
      } else {
        res.status(401).json({
          code: 401,
          message: 'Missing data',
        })
      }
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existent enroll',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      menubar: err,
    })
  }

}

const deleteAllEnroll = async (req, res) => {
  try {
    let result = await Enroll.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      })
    }
    else {
      res.status(400).json({
        code: 400,
        message: 'Enroll is empty',
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const deleteEnrollById = async (req, res) => {
  try {
    let findEnroll = await Enroll.deleteOne({ id: req.body.id })
    if (!req.body.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing data in body',
      })
      return;
    }
    if (findEnroll.deletedCount > 0) {
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

module.exports = { getAllEnroll, getEnrollById, createNewEnroll, updateEnroll, deleteAllEnroll, deleteEnrollById }