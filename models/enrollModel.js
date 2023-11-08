const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    //default: 1
  },
  title: {
    type: String,
    require: true,
    //default: 'Đối tượng tuyển sinh được tuyển theo đề án tuyển sinh hằng năm của Trường Đại học Công nghệ thông tin - ĐHQG TpHCM',
  }
})

module.exports = mongoose.model("Enroll", enrollSchema);