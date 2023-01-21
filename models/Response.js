const { Schema, model } = require('mongoose');
const date = require('moment');
const userSchema = require('./User');

// Schema for what makes up a response
const responseSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

});

// Initialize the Response model
const Response = model('response', responseSchema);

module.exports = Response;