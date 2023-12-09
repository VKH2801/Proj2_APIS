const mongoose = require("mongoose");

const generalKwonledgeModelSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    //default: 'Khối kiến thức giáo dục đại cương',
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
}, { timestamps: true });

module.exports = mongoose.model('GeneralKnowledge', generalKwonledgeModelSchema);