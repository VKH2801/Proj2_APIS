const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.DB_STRING;

const dbConnect = async () => {
    try {
        await mongoose.connect(uri, {
          dbName: 'project2',
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connect database success");
      } catch (error) {
        console.log("Connect database failed");
      }
}

module.exports = dbConnect;