var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var CandidateSchema = new Schema({
  name: String,
  address: String,
  party: String,
  age: Number,
  sex: String,
  pid: {type: Number, default: 0 },
  presidential: {type: Boolean,default: false },
  did:{type: Number,default: 0 },
  district: {type: Boolean,default: false},
  dname:String,
  pvote: {type: Number,default: 0 },
  dvote: {type: Number,default: 0 },
  prn: { type: Number, default: 0}
})

module.exports = mongoose.model("Candidate", CandidateSchema)
