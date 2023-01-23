const { Schema, model } = require("mongoose");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .populate("friends")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("posts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
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
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    const friend = await User.findById( friendId );
    const user = await User.findById( userId );

    user.friends.push(friend);
    user.save();

    res.json(
      user
    );
  },

  //Delete a friend

  async deletefriend(req, res) {
    const friendGetterUsername = req.body.friendGetterUsername;
    const friendUsername = req.body.friendUsername;

    const friend = await User.findOne({ userName: friendUsername });
    const user = await User.findOne({ userName: friendGetterUsername });

    for (let i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === friend) {
        user.friends.splice(i, 1);
      }
    }
    user.save();
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        res.status(404).json({ message: "No user with that ID" });
      } else {
        // User.deleteMany({ _id: { $in: deletedUser.users } });
        res.json({ message: "User deleted!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
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
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
