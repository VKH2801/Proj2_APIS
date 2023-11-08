const lodash = require("lodash");
const Overview = require('../models/overviewModel');

const getAllOverview = async (req, res) => {
    try {
        let data = await Overview.find();
        res.status(200).json({
            code: 200,
            data: data,
            message: 'OK',
        });
    } catch (err) {
        res.status(500).json(
            {
                code: 500,
                message: error
            }
        );
    }
};

const createOverview = async (req, res) => {
    try {
        let { eduName, eduId, eduType, applicableSubjects, goalsTraining, goalsAfterTraining, perspectivesTraining, formOfTraining, degreeTraining, majorTraining } = req.body;
        let findOverviewId = await Overview.findOne({ eduId: eduId })
        let fintOverviewName = await Overview.findOne({eduName: eduName})

        if (findOverviewId) {
            res.status(401).json(
                {
                    code: 401,
                    message: 'Existing id Overview',
                }
            )
            return;
        }
        if (fintOverviewName) {
            res.status(402).json (
                {
                    code: 402,
                    message: 'Existing name Overview',
                }
            )

        }
        if (!eduName || !eduId || !eduType || !applicableSubjects || !goalsTraining || !goalsAfterTraining || !perspectivesTraining || !formOfTraining || !degreeTraining || !majorTraining) {
            res.status(400).json(
                {
                    code: 400,
                    message: 'Missing data',
                }
            )
            return;
        }
        else {
            let newOverview = new Overview({
                eduName: eduName,
                eduId: eduId,
                eduType: eduType,
                applicableSubjects: applicableSubjects,
                goalsTraining: goalsTraining,
                goalsAfterTraining: goalsAfterTraining,
                perspectivesTraining: perspectivesTraining,
                formOfTraining: formOfTraining,
                degreeTraining: degreeTraining,
                majorTraining: majorTraining,
            })
            let result = await newOverview.save();
            res.status(200).json({
                code: 200,
                data: lodash.omit(result.toObject()),
                message: "OK",
            });
            return;
        }
       
    }
    catch (err) {
        res.status(500).json(
            {
                code: 500,
                message: err,
            }
        )
    }

};

const updateOverview = async (req, res) => {
    try {
        let findOverview = await Overview.findOne({ _id: req.params.id });
        if (findOverview) {
            if (!req.body.eduId) {
                await findOverview.updateOne({ $set: lodash.omit(req.body) })
                let data = await Overview.findOne({ _id: req.params.id });
                res.status(200).json({
                    code: 200,
                    data: lodash.omit(data.toObject()),
                    message: 'OK',
                })
            } else {
                res.status(401).json({
                    code: 401,
                    message: 'Invalid param: eduId is unavailable to update',
                })
            }

        } else {
            res.status(400).json({
                code: 400,
                message: 'Overview not found',
            })
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: err,
        })
    }
}
const deleteAllOverview = async (req, res) => {
    try {
        let result = await Overview.deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).json({
                code: 200,
                message: 'OK',
            });
        } else {
            res.status(401).json({
                code: 401,
                message: 'Overview is empty',
            });
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: err,
        })
    }
}

const deleteByIdOverview = async (req, res) => {
    try {
        let overview = await Overview.deleteOne({eduId: req.body.eduId})
        console.log(overview);
        if (overview.deletedCount > 0) {
            res.status(200).json({
                code: 200,
                message: 'OK',
            })
        } else {
            res.status(400).json({
                code: 400,
                message: 'Overview not found',
            })
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: err,
        })
    }
}

module.exports = { getAllOverview, createOverview, updateOverview, deleteAllOverview, deleteByIdOverview };