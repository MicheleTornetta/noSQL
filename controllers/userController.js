const { Schema, model } = require("mongoose");
const User = require("../models/User");
const moment = require("moment");
const { Post } = require("../models");

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

  async deleteFriend(req, res) {
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    const user = await User.findById( userId );

    for (let i = 0; i < user.friends.length; i++) {
      if (user.friends[i]._id.equals(friendId)) {
        user.friends.splice(i, 1);
      }
    }

    user.save();

    res.json(
      user
    );
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        res.status(404).json({ message: "No user with that ID" });
      } else {
        await Post.deleteMany({ User: deletedUser.userName});
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
