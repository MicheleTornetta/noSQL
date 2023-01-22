const { Schema, model } = require("mongoose");
const { Post, User } = require("../models");
const moment = require("moment");

module.exports = {
  getPosts(req, res) {
    Post.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },
  getSinglePost(req, res) {
    Post.findById(req.params.postId)
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with that ID" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new post
  createPost(req, res) {
    Post.create(req.body)
      .then((post) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { posts: post._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Post created, but found no user with that ID" })
          : res.json("Created the post!")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a post
  deletePost(req, res) {
    Post.findOneAndDelete({ _id: req.params.postId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with that ID" })
          : User.deleteMany({ _id: { $in: post.users } })
      )
      .then(() => res.json({ message: "Post and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a post
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with this id!" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a reaction

  async createReaction(req, res) {
    const post = await Post.findById(req.body.postId).exec();

    if (!post) {
      res.status(400).json({ message: "No post with this id!" });
      return;
    }

    post.responses.push({
      text: req.body.text,
      user: req.body.user,
      createdAt: new Date(),
    });

    post.save();

    res.json(post.responses[post.responses.length - 1]);
  },

  // delete a reaction

  async deleteReaction(req, res) {
    const post = await Post.findById(req.body.postId);

    for (let i = 0; i < post.responses.length; i++) {
      if (post.responses[i]._id.equals(req.body.responseId)) {
        post.responses.splice(i, 1);
      }
    }

    post.save();

    res.json(post);
  },
};
