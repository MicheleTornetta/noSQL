const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: true,
    },
    
      firstName: String,
      lastName: String,
      age: Number,
      friend: User,
      posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'post',
        },
      ],
    },

  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const firstName = v.split(' ')[0];
    const lastName = v.split(' ')[1];
    this.set({ firstName, lastName });
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
  