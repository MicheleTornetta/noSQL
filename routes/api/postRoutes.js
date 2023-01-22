const router = require('express').Router();
const {
  getSinglePost,
  getPosts,
  createPost,
  updatePost,
  createReaction,
  deleteReaction,
  deletePost
} = require('../../controllers/postController');

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getSinglePost).delete(deletePost);

router.route('/:postId').put(updatePost);

router.route('/reactions').post(createReaction).delete(deleteReaction);





module.exports = router;
