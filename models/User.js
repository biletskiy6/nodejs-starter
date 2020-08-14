const { Schema, model } = require('mongoose');
const validator = require('validator');
const requiredString = {
  type: String,
  required: true
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      return validator.isEmail(value);
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value) {
      return value.toLowerCase() !== "password";
    }
  }
  // name: requiredString,
  // email: requiredString,
  // role: {
  //   ...requiredString,
  //   default: "user",
  //   enum: ["user", "admin", "superadmin"]
  // },
  // username: requiredString,
  // password: requiredString,
}, { timestamps: true } );


module.exports = model('users', UserSchema);