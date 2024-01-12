const mongoose = require("mongoose");

const subjectDetails = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
    //default: 'SS003',
  },
  title: {
    type: String,
    required: true,
    //default: 'Tu tuong HCM'
  },
  theoryCredits: {
    type: Number,
    //default: 2
  },
  practiseCredits: {
    type: Number,
    //default: 0
  },
  optionCredits: {
    type: String,
  },
  idSubjectCombination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubjectCombination'
  },
  idOutputStandard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OutputStandard',
  },
  idClassificationScale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassificationScale',
  },
  englishTitle: {
    type: String,
  },

  
  //relation ship output standard with classification scale
  relationship: [
    {
      code: {
        type: String
      },
      idOutputStandard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OutputStandard'
      },
      idClassificationScale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassificationScale',
      }
      
    }
  ],
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