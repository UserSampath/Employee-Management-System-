const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Teams } = require("../utils/Constants");

const MemberSchema = new Schema(
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
    contactNumber: {
      type: Number,
      required: false,
    },
    SelectedTeams: [{
      type: String,
      enum: [
        Teams.WebTeam,
        Teams.UiTeam,
        Teams.FlutterTeam,
        Teams.QaTeam,
        Teams.ApiTeam
      ],
    }],
    Projects: {
      type: [String],
    },
    email: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
    },
    StartedDate: {
      type: Date,
      
    },
    GitUserName:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Member', MemberSchema);
