const { Schema, model } = require('mongoose');
const date = require('moment');

// Schema to create Post model
const postSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },

    text: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt 
        const timestamp = moment().get('date'+, 'hour':'minute');
    },

    User: {
      type: String,
      required: true,
    },

    Response: [responseSchema]
    },
    
    meta: {
      responses: Number,
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
    return this.meta.responses;
  });

// Initialize our Post model
const Post = model('post', postSchema);

module.exports = Post;