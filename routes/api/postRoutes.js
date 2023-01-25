const router = require('express').Router();
const {
  getSingleThoughts,
  getThoughts,
  createThoughts,
  updateThoughts,
  createReaction,
  deleteReaction,
  deleteThoughts
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).thoughts(createThoughts);

router.route('/:thoughtsId').get(getSingleThoughts).delete(deleteThoughts);

router.route('/:thoughtsId').put(updateThoughts);

router.route('/reactions').thoughts(createReaction).delete(deleteReaction);





module.exports = router;
