const lodash = require("lodash");
const ReferenceDoc = require("../models/referenceDocModel");

const getAllReferencesDoc = async (req, res) => {
  try {
    const findReferences = await ReferenceDoc.find();
    res.status(200).json({
      code: 200,
      data: findReferences,
      message: 'OK',
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const getRefDocById = async (req, res) => {
  try {
    let findRefDoc = await ReferenceDoc.findOne({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: 'Missing Id in request parameter',
      })
      return;
    }
    res.status(200).json({
      code: 200,
      data: findRefDoc,
      message: 'OK',
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    });
  }
}

const createReferencesDoc = async (req, res) => {
  try {
    let {
      id,
      content,
      isDomesticContent,
    } = req.body;
    const findReferences = await ReferenceDoc.findOne({ id: id });
    if (!id || !content || !isDomesticContent) {
      res.status(401).json({
        code: 401,
        message: 'Missing data',
      })
      return;
    }
    if (!findReferences) {
      let newRefDoc = new ReferenceDoc({
        id: id,
        content: content,
        isDomesticContent: isDomesticContent,
      })
      let result = await newRefDoc.save();
      res.status(200).json({
        code: 200,
        data: lodash.omit(result.toObject()),
        message: 'OK',
      })
      return;
    } else {
      res.status(400).json({
        code: 400,
        message: 'Existing references document'
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}

const updateReferences = async (req, res) => {
  try {
    let id = req.body.id;
    if (id) {
      res.status(402).json({
        code: 402,
        message: 'Unable update id - It a unique key',
      })
      return;
    }
    const findReferences = await ReferenceDoc.findOne({ _id: req.params.id });
    if (findReferences) {
      await findReferences.updateOne({ $set: lodash.omit(req.body, 'id') });
      const data = await ReferenceDoc.findOne({ _id: req.params.id });
      //console.log(data);
      res.status(200).json({
        code: 200,
        data: lodash.omit(data.toObject()),
        message: 'OK',
      })
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existent reference document',
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
};

const deleteAllReferences = async (req, res) => {
  try {
    const results = await ReferenceDoc.deleteMany({});
    if (results.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existent reference document',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
};

const deleteReferencesById = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.status(401).json({
        code: 401,
        message: 'Missing id',
      });
    }
    const results = await ReferenceDoc.deleteOne({ id: id });
    if (results.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: 'OK',
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Non existent reference document'
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    });
  }
};

module.exports = {
  getAllReferencesDoc,
  getRefDocById,
  createReferencesDoc,
  updateReferences,
  deleteAllReferences,
  deleteReferencesById,
}