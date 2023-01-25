const { Schema, model } = require("mongoose");
const { Thoughts, User } = require("../models");
const moment = require("moment");

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThoughts(req, res) {
    Thoughts.findById(req.params.thoughtsId)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thoughts
  async createThoughts(req, res) {
    const user = await User.findById(req.body.userId);

    if (!user) {
      res
        .status(404)
        .json({ message: "No user with that ID" });
    } else {
      const thought = await Thoughts.create({
        text: req.body.text,
        User: user.userName
      });
      
      user.thoughts.push(thought);
      user.save();
      
      res.json(thought);
    }
  },

  // Delete a thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : // : User.deleteMany({ _id: { $in: thoughts.users } })
            undefined
      )
      .then(() => res.json({ message: "Thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a reaction

  async createReaction(req, res) {
    const thought = await Thoughts.findById(req.body.thoughtsId).exec();

    if (!thought) {
      res.status(400).json({ message: "No thoughts with this id!" });
      return;
    }

    thought.responses.push({
      text: req.body.text,
      user: req.body.user,
      createdAt: new Date(),
    });

    thought.save();

    res.json(thought.responses[thought.responses.length - 1]);
  },

  // delete a reaction

  async deleteReaction(req, res) {
    const thought = await Thoughts.findById(req.body.thoughtsId);

    for (let i = 0; i < thought.responses.length; i++) {
       
      if (thought.responses[i]._id.equals(req.body.responseId)) {
        thought.responses.splice(i, 1);
      }
    }

    thought.save();

    res.json(thought);
  },
};
