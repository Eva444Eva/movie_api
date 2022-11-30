const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

const Movie = require('./movie.js')

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favoriteMovies: [{ type: mongoose.ObjectId, ref: Movie }]
});

module.exports = model('User', userSchema);
