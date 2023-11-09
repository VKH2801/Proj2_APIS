
const CodeRes = {
  CodeOk: 200,
  CodeExistData: 400,
  CodeMissingRequiredData: 401,
  CodeUnableUpdateId: 402,
  CodeNonExistData: 403,
  CodeEmptyCollection: 404,
  CodeCatchErorr: 500,
}
const MessageRes = {
  status200: 'OK',
  status400: 'Existing data',
  status401: 'Missing required data',
  status402: 'Unable update id - It a unique key',
  status403: 'Non existent data',
  status404: 'Empty collection',
}

module.exports = {CodeRes, MessageRes}