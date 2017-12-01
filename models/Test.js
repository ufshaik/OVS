var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var TestSchema = new Schema({
  name: String,
  show: Boolean
})

module.exports = mongoose.model("Test", TestSchema)
