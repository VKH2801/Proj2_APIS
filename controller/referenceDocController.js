const lodash = require("lodash");
const ReferenceDoc = require("../models/referenceDocModel");
const User = require("../models/userModel");

const getAllReferencesDoc = async (req, res) => {
  try {
    const findReferences = await ReferenceDoc.find();
    res.status(200).json({
      code: 200,
      data: findReferences,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const getRefDocById = async (req, res) => {
  try {
    let findRefDoc = await ReferenceDoc.findById({ _id: req.params.id });
    if (!req.params.id) {
      res.status(401).json({
        code: 401,
        message: "Missing Id in request parameter",
      });
      return;
    }

    if (findRefDoc) {
      res.status(200).json({
        code: 200,
        data: findRefDoc,
        message: "OK",
      });
    } else {
      res.status(403).json({
        code: 403,
        message: 'Non existent data'
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const createReferencesDoc = async (req, res) => {
  try {
    let { title, domesticContent, nonDomesticContent, createdBy } = req.body;

    if (!createdBy) {
      res.status(401).json({
        code: 401,
        message: "Missing data",
      });
      return;
    }

    const findUserCreated = await User.findOne({ _id: createdBy });

    if (!findUserCreated) {
      return res.status(400).json({
        code: 400,
        message: "Non existing user for creation",
      });
    }
    const newRefDoc = new ReferenceDoc({
      title: title,
      domesticContent: domesticContent,
      nonDomesticContent: nonDomesticContent,
      idUserLatestEdit: findUserCreated,
      listIdUserEdited: [findUserCreated],
      createdBy: findUserCreated,
    });

    const result = await newRefDoc.save();
    return res.status(200).json({
      code: 200,
      data: result,
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const updateReferences = async (req, res) => {
  try {
    let { title, domesticContent, nonDomesticContent, idUserLatestEdit } = req.body;
    if (!idUserLatestEdit) {
      return res.status(401).json({
        code: 401,
        message: "Missing User ID for update references document",
      });
    }


    const findUserLatestEdit = await User.findOne({ _id: idUserLatestEdit });
    if (!findUserLatestEdit) {
      return res.status(405).json({
        code: 405,
        message: "Invalid User ID for update references document",
      });
    }

    const findReferences = await ReferenceDoc.findOne({ _id: req.params.id });

    if (findReferences) {
      req.body.listIdUserEdited = findReferences.listIdUserEdited
        ? findReferences.listIdUserEdited
        : [];
      req.body.createdBy = findReferences.createdBy
        ? findReferences.createdBy
        : "";
      if (!req.body.listIdUserEdited.includes(idUserLatestEdit)) {
        req.body.listIdUserEdited.push(idUserLatestEdit);
      }

      await ReferenceDoc.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: lodash.omit(req.body, "id") },
        { new: true }
      );
      const data = await ReferenceDoc.findOne({ _id: req.params.id });
      res.status(200).json({
        code: 200,
        data: data,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existent reference document",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteAllReferences = async (req, res) => {
  try {
    const results = await ReferenceDoc.deleteMany({});
    if (results.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existent reference document",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const deleteReferencesById = async (req, res) => {
  try {
    const results = await ReferenceDoc.deleteOne({ _id: req.params.id });
    if (results.deletedCount > 0) {
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Non existent reference document",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
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
};
