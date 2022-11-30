const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, min: 1890, required: true },
  description: String,
  director: {
    name: { type: String, required: true },
    nationality: String,
    birth: Number,
    death: Number
  },
  genre: {
    name: { type: String, required: true },
    description: String
  },
  featured: Boolean
});

module.exports = model('Movie', movieSchema);
