const mongoose = require("mongoose");
const UserSchema = require('./userModel');

const trainingRegulation = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //default: 'Training registration',
  },
  content: {
    type: String,
    required: true,
    //default: 'Chương trình đào tạo cử nhân chính quy ngành Kỹ thuật Phần mềm được thực hiện theo quy chế, quy định đào tạo hiện hành của Trường Đại học Công nghệ Thông tin.',
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
  }
}, { timestamps: true })

module.exports = mongoose.model('TrainingRegulation', trainingRegulation);