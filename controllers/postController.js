const { Schema, model } = require("mongoose");
const { Thoughts, User } = require("../models");
const moment = require("moment");

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThoughts(req, res) {
    Thoughts.findById(req.params.thoughtsId)
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : res.json(thoughts)
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
      const thoughts = await Thoughts.create({
        text: req.body.text,
        User: user.userName
      });
      
      user.thoughts.push(thoughts);
      user.save();
      
      res.json(thoughts);
    }
  },

  // Delete a thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
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
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a reaction

  async createReaction(req, res) {
    const thoughts = await Thoughts.findById(req.body.thoughtsId).exec();

    if (!thoughts) {
      res.status(400).json({ message: "No thoughts with this id!" });
      return;
    }

    thoughts.responses.push({
      text: req.body.text,
      user: req.body.user,
      createdAt: new Date(),
    });

    thoughts.save();

    res.json(thoughts.responses[thoughts.responses.length - 1]);
  },

  // delete a reaction

  async deleteReaction(req, res) {
    const thoughts = await Thoughts.findById(req.body.thoughtsId);

    for (let i = 0; i < thoughts.responses.length; i++) {
      if (thoughts.responses[i]._id.equals(req.body.responseId)) {
        thoughts.responses.splice(i, 1);
      }
    }

    thoughts.save();

    res.json(thoughts);
  },
};
