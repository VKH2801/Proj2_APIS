//Import libraries
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// End region



//Declare Routes
const userRouter = require("./routes/userRoute");
const overviewRouter = require("./routes/overviewRoute");
const enrollRouter = require("./routes/enrollRoute");
const trainingRegRouter = require("./routes/trainingRegulationRoute");
const graduationConditionRouter = require("./routes/graduationConditionRoute");
const outputStandardRouter = require("./routes/outputStandardRouter");
const outputTypeRouter = require("./routes/outputTypeRoute");
const referencesDocRouter = require("./routes/referenceDocRouter");
// End region


//Use routes to app
app.use("/user", userRouter);
app.use("/overview", overviewRouter);
app.use("/enroll", enrollRouter);
app.use("/trainingReg", trainingRegRouter);
app.use("/graduationCondition", graduationConditionRouter);
app.use("/outputStandard", outputStandardRouter);
app.use("/outputType", outputTypeRouter);
app.use("/referenceDoc", referencesDocRouter);
// End region



app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running at ${PORT}`);    
});