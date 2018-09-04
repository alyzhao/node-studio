exports.errorHandle = function (res, message, err) {
  return res.status(500).json({message, err})
}