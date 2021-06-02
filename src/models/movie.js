const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:String,
    year:Number,
    category:String,
    director:String,
    actors:[String],
    description:String
});

module.exports = mongoose.model('movies',MovieSchema);