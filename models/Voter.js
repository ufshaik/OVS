var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var VoterSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  middlename: String,
  age: Number,
  password: String,
  email: String
})

module.exports = mongoose.model("Voter", VoterSchema)
