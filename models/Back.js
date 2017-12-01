var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var BackSchema = new Schema({
  name: String,
  party: String,
  age: Number,
  pid: {
    type: Number,
    default: 0
  },
  presidential: {
    type: Boolean,
    default: false
  },
  district: {
    type: Boolean,
    default: false
  },
  vote: {
    type: Number,
    default: 0
  },
  pvote: {
    type: Number,
    default: 0
  },
  dvote: {
    type: Number,
    default: 0
  },
  did: { type: Number, default:0},
  dname: String,
  seats: {type: Number, default:0}
})

module.exports = mongoose.model("Back", BackSchema)
