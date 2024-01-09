const mongoose = require("mongoose");

const subjectCombinationSchema = new mongoose.Schema({
  content: {
    type: String,
    //default: Lý luận chính trị và pháp luật
  },
  title: {
    require: true,
    type: String,
  },
  totalCredits: {
    type: Number,
    require: true,
    //default: 13
  },
  percents: {
    type: Number,
    //default: 10 - (10%)
  },
  type: {
    type: String,
    required: true,
    enum: ['general', 'professional', 'graduate'],
    default: 'general',
  },
  // idGeneralKnowledge: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'GeneralKnowledge',
  //   require: true,
  // },
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

module.exports = mongoose.model('SubjectCombination', subjectCombinationSchema);
