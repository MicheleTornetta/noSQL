const { Schema, model } = require('mongoose');
const { Post, Response } = require('../models');
const moment = require('moment');

module.exports = {
  getResponse(req, res) {
    Response.find()
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single response
  getSingleResponse(req, res) {
    Response.findOne({ _id: req.params.responseId })
      .then((response) =>
        !response
          ? res.status(404).json({ message: 'No response found with that id' })
          : res.json(response)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a response
  createResponse(req, res) {
    Response.create(req.body)
      .then((response) => {
        return Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $push: { response: response._id } },
          { new: true }
        );
      })
      .then((post) =>
        !post
          ? res
              .status(404)
              .json({ message: 'response created, but no posts with this ID' })
          : res.json({ message: 'response created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },
};
