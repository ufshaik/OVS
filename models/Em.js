var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var EmSchema = new Schema({
  name: String,
  password: String
})

module.exports = mongoose.model("Em", EmSchema)
