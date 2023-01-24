const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema for what makes up a response
const responseSchema = new Schema({

  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      return moment(createdAt).format('MMMM Do YYYY, h:mm a');
    }
  },

});

// Schema to create Post model
const postSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },

    
    User: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      minlength: 1,
      maxlength: 280,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => {
        return moment(createdAt).format('MMMM Do YYYY, h:mm a');
      }
    },

    responses: [
      responseSchema,
    ],
  }, 
  
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `responseCount` that gets the amount of comments per user
postSchema
  .virtual('responseCount')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Post model
const Post = model('post', postSchema);

module.exports = Post;
