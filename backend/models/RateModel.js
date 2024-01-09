const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateUserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    Job: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Rate: {
      type: [Number], 
    },
    Image: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('RateUser', RateUserSchema);
