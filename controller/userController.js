const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const lodash = require("lodash");

const getUser = async (req, res) => {
  try {
    let data = await User.find().populate([
      'pdfData.overview',
      'pdfData.enroll',
      'pdfData.outputType',
      'pdfData.classifyScale',
      'pdfData.subjectCombination',
    ]);
    res.status(200).json({
      code: 200,
      data: data,
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password } = req.body;
    let findUser = await User.findOne({ email: email }).populate([
      'pdfData.overview',
      'pdfData.enroll',
      'pdfData.outputType',
      'pdfData.classifyScale',
      'pdfData.subjectCombination',
    ]);;
    if (findUser === null) {
      res.status(420).json({
        code: 420,
        message: "Email không tồn tại",
      });
    } else {
      let isValid = await bcrypt.compare(password, findUser.password);
      if (isValid) {
        res.status(200).json({
          code: 200,
          data: lodash.omit(findUser.toObject(), "password"),
          message: "OK",
        });
      } else {
        res.status(421).json({
          code: 421,
          message: "Email hoặc password không đúng",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    let {
      email,
      password,
      role,
      gender,
      lastName,
      firstName,
      phoneNumber,
      avatar,
    } = req.body;
    console.log(req.body);
    let findUser = await User.findOne({ email: email });

    if (findUser) {
      return res.status(420).json({
        code: 420,
        message: "Existing Email",
      });
    } else {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      // const hashPassword = bcrypt.hashSync(password, salt);
      await bcrypt.hash(password, salt, async function (err, hash) {
        console.log(hash);
        if (hash) {
          let newUser = new User({
            email: email,
            password: hash,
            role: role,
            gender: gender,
            lastName: lastName ?? "",
            firstName: firstName ?? "",
            phoneNumber: phoneNumber ?? "",
            avatar: avatar ?? "",
          });
          //let result = await newUser.save();
          await newUser.save();
          const findResultUser = await User.findOne({ email: email });
          res.status(200).json({
            code: 200,
            data: findResultUser,
            message: "OK",
          });
        } else {
          res.status(501).json({
            code: 501,
            message: err.message,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // if (!req.body) {
    //   return res.status(400).json({
    //     code: 400,
    //     message: "Missing data in body",
    //   });
    // }

    let findUser = await User.findOne({ _id: req.params.id });
    if (req.body.password) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt); // Use await here
      req.body.password = hash;
    }
    if (findUser) {
      //await findUser.updateOne({ $set: lodash.omit(req.body, "email") });
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: lodash.omit(req.body, "email") },
        { new: true }
      ).populate([
        'pdfData.overview',
        'pdfData.enroll',
        'pdfData.outputType',
        'pdfData.classifyScale',
        'pdfData.subjectCombination',
      ]);;

      //let data = await User.findOne({ _id: req.params.id });
      res.status(200).json({
        code: 200,
        data: result,
        message: "OK",
      });
    } else {
      res.status(420).json({
        code: 420,
        message: "Non existent user",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

const getUserDetail = async (req, res) => {
  try {
    let data = await User.findOne({ _id: req.params.id }).populate([
      'pdfData.overview',
      'pdfData.enroll',
      'pdfData.outputType',
      'pdfData.classifyScale',
      'pdfData.subjectCombination',
    ]);;
    if (data) {
      res.status(200).json({
        code: 200,
        data: lodash.omit(data.toObject(), "password"),
        message: "OK",
      });
    } else {
      res.status(420).json({
        code: 420,
        message: "Tài khoản không tồn tại",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

const deleteUserWith = async (req, res) => {
  try {
    let data = req.body;
    if (data) {
      await data.deleteMany({
        $set: lodash.omit(
          req.body,
          "email",
          "_id",
          "password",
          "role",
          "gender",
          "lastName",
          "firstName",
          "phoneNumber"
        ),
      });
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(420).json({
        code: 420,
        message: "Invalid data for delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    let data = await User.findOne({ _id: req.params.id });
    if (data) {
      await data.deleteOne({ _id: req.params.id });
      res.status(200).json({
        code: 200,
        message: "OK",
      });
    } else {
      res.status(420).json({
        code: 420,
        message: "Tài khoản không tồn tại",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

module.exports = {
  getUser,
  register,
  login,
  updateUser,
  getUserDetail,
  deleteUserWith,
  deleteUserById,
};
