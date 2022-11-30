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

userSchema.statics.hashPassword = function(pw) {
  return bcrypt.hashSync(pw, 10);
};
userSchema.methods.validatePassword = function(pw) {
  return bcrypt.compareSync(pw, this.password);
};

module.exports = model('User', userSchema);
