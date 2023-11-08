const lodash = require("lodash");

export const getAll = async (req, res, schemaType) => {
  try {
    const findSchemaData = await schemaType.find()
    res.status(200).json({
      code: 200,
      data: lodash.omit(findSchemaData.toObject()),
      message: 'OK',
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err,
    })
  }
}


module.exports = {
  getAll,
}