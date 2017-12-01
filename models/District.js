var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;

var DistrictSchema = new Schema({
    id: { type: Number, default: 0 },
    name: String,
    eid: { type: Number, default: 0 } 
})

module.exports = mongoose.model("District", DistrictSchema)
