var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var PartySchema = new Schema({
  name: String,
  symbol: String,
  dvotes: {type: Number, default: 0}
})

module.exports = mongoose.model("Party", PartySchema)
