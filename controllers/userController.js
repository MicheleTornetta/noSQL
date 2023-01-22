const { Schema, model } = require('mongoose');
const User = require('../models/User');
const moment = require('moment');

module.exports = {
  getAllUsers(req, res) {
    User.find().populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('posts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  //Add a Friend

  async addFriend(req, res) {
    const friendGetterUsername = req.body.friendGetterUsername;
    const friendUsername = req.body.friendUsername;

    const friend = await User.findOne({userName: friendUsername});
    const user = await User.findOne({userName: friendGetterUsername});

    user.friends.push(friend);
    user.save();

    res.json({
      status: 'Success'
    });
  },

  //Delete a friend

  async deletefriend(req, res) {
    const friendGetterUsername = req.body.friendGetterUsername;
    const friendUsername = req.body.friendUsername; 

    const friend = await User.findOne({userName: friendUsername});
    const user = await User.findOne({userName: friendGetterUsername});

    for (let i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === friend) {
        user.friends.splice(i, 1);
      }
    }
    user.save();
  },

// Delete a user
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : User.deleteMany({ _id: { $in: user.users } })
    )
    .then(() => res.json({ message: 'User deleted!' }))
    .catch((err) => res.status(500).json(err));
},

// Update a user
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
};




