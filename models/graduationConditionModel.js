const mongoose = require("mongoose");

const graduationConditions = mongoose.Schema({
  id: {
    type: number,
    require: true,
    //default: 1
  },
  name: {
    type: string,
    require: true,
    //default: 'Sinh viên đã tích lũy tối thiểu 130 tín chỉ, đã hoàn thành các môn học bắt buộc của chương trình đào tạo tương ứng với chuyên ngành.'
  },
  overViewReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Overview',
    require: true,
    //default: '7480103',
    // This field is the id of overview model to reference
  }
})