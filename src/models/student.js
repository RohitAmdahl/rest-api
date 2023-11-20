const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email id is already present"],
    validator(value) {
      if ((!validator, isEmail("foo@bar.com"))) {
        throw new Error("Invalid Email");
      }
    },
  },

  phone: {
    type: Number,
    min: 10,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const StudentData = new mongoose.model("Student", studentSchema);

module.exports = StudentData;
