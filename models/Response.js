const { Schema, model } = require('mongoose');

// Schema for what makes up a response
const responseSchema = new Schema({
  text: String,
  username: String,
});

// Initialize the Response model
const Response = model('response', responseSchema);

module.exports = Response;