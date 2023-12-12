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
const classifyScaleRouter = require("./routes/classifyScaleRoute");
const generalKnowledgeRouter = require("./routes/generalKnowledgeRoute");
const subjectCombinationRouter = require("./routes/subjectCombinationRoute");
const subjectDetailsRouter = require("./routes/subjectDetailsRoute");
// End region


//Use routes to app
//app.use("/", )
app.use("/user", userRouter);
app.use("/overview", overviewRouter);
app.use("/enroll", enrollRouter);
app.use("/trainingReg", trainingRegRouter);
app.use("/graduationCondition", graduationConditionRouter);
app.use("/outputStandard", outputStandardRouter);
app.use("/outputType", outputTypeRouter);
app.use("/referenceDoc", referencesDocRouter);
app.use("/classifyScale", classifyScaleRouter);
app.use("/generalKnowledge", generalKnowledgeRouter);
app.use("/subjectCombination", subjectCombinationRouter);
app.use("/subjectDetails", subjectDetailsRouter);
// End region

//TODO: idea1 Add new pages ở đó đã có render sẵn thứ tự các elements trong văn bản thành 1 trang html hoàn chỉnh. Ở đó ta sử dụng bài báo này để làm "https://www.telerik.com/blogs/generating-pdf-html-react-example-exporting-data-grids"

//TODO: idea2 sử dụng các thuộc tính thế này https://github.com/tone-row/flowchart-fun

//TODO: idea3 https://reactflow.dev/examples/nodes/custom-node , https://github.com/xyflow/xyflow/discussions/1061 --> recommend


// ----------------------------------------------------------------

//TODO: Home page sữ tạo ra danh sách các thứ đã đc tạo ra cũng như update.

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running at ${PORT}`);    
});