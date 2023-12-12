const mongoose = require("mongoose");

const subjectDetails = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
    //default: 'SS003',
  },
  name: {
    type: String,
    required: true,
    //default: 'Tu tuong HCM'
  },
  theoryCredits: {
    type: Number,
    required: true,
    //default: 2
  },
  practiseCredits: {
    type: Number,
    required: true,
    //default: 0
  },
  idSubjectCombination: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SubjectCombination'
  },
  idOutputStandard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OutputStandard',
    require: true,
  },
  idClassificationScale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassificationScale',
    require: true,
  },
  englishName: {
    type: String,
  },
  //Tóm tắt
  synopsis: {
    type: String,
  },
  idUserLatestEdit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  listIdUserEdited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

module.exports = mongoose.model('SubjectDetails', subjectDetails);