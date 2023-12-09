const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    //default: 'Enrollment 1',
  },
  content: {
    type: String,
    required: true,
    //default: 'Đối tượng tuyển sinh được tuyển theo đề án tuyển sinh hằng năm của Trường Đại học Công nghệ thông tin - ĐHQG TpHCM',
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

module.exports = mongoose.model("Enroll", enrollSchema);