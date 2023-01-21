const { Schema, model } = require('mongoose');
const date = require('moment');

// Schema to create User model
const userSchema = new Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
      
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'post',
        },
    ],
    
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ]
  },

    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    { toJSON: {
        virtuals: true,
        },
    id: false,
    }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('countFriends')
  // Getter
  .get(function () {
    return '${this.friends.length}';
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
  