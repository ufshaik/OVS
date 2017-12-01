var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;
//var AutoIncrement = require('mongoose-sequence')(mongoose)


var ElectionSchema = new Schema({
  eid: Number,
  type: String,
  status: String,
  sdate: Date,
  edate: Date,
  s1date: Date,
  e1date: Date,
   seats:{type: Number, default:0}
})

//ElectionSchema.plugin(AutoIncrement,{inc_field:'eid'});




module.exports = mongoose.model("Election", ElectionSchema)
