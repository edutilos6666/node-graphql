var mongoose = require("mongoose");

var WorkerSchema = new mongoose.Schema({
    id: String,
    fname: String,
    lname: String,
    age: { type: Number, min: 20, max: 70},
    wage: Number,
    active: Boolean,
    bday: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Worker", WorkerSchema);