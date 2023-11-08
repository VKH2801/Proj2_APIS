const mongoose = require("mongoose");


const trainingRegulation = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    //default: 1,
  },
  title: {
    type: String,
    required: true,
    //default: 'Chương trình đào tạo cử nhân chính quy ngành Kỹ thuật Phần mềm được thực hiện theo quy chế, quy định đào tạo hiện hành của Trường Đại học Công nghệ Thông tin.',
  }
})

module.exports = mongoose.model('TrainingRegulation', trainingRegulation);