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

router.route('/reactions').post(createReaction).delete(deleteReaction);


router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtsId').get(getSingleThoughts).delete(deleteThoughts);

router.route('/:thoughtsId').put(updateThoughts);







module.exports = router;
