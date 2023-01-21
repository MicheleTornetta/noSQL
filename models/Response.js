const { Schema, model } = require('mongoose');
const date = require('moment');

// Schema for what makes up a response
const responseSchema = new Schema({
  text: String,
  user: String,
  minLength: 1,
  maxLength: 280,
  required: false,
});

// Initialize the Response model
const Response = model('response', responseSchema);

module.exports = Response;