const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  yearOfGraduation: Number,
  university: String,
  contactDetails: {
    phone: String,
    address: String,
  },
  employmentHistory: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
  }],
  familyMembers: [{
    name: String,
    relation: String,
  }],
  lifeEvents: [{
    title: String,
    description: String,
    date: Date,
  }],
  city: String,
  organization: String,
});

module.exports = mongoose.model('Person', personSchema);
