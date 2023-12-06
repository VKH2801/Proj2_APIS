const mongoose = require("mongoose");

const subjectCombinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    //default: Lý luận chính trị và pháp luật
  }, 
  totalCredits: {
    type: Number,
    require: true,
    //default: 13
  },
  percents: {
    type: Number,
    required: true,
    //default: 10 - (10%)
  },
  idGeneralKnowledge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GeneralKnowledge',
    require: true,
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

module.exports = mongoose.exports('SubjectCombination', subjectCombinationSchema);