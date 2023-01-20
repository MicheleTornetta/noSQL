const router = require('express').Router();
const {
  getResponse,
  getSingleResponse,
  createResponse,
} = require('../../response/responseController');

// /api/response
router.route('/').get(getResponse).post(createResponse);

// /api/response/:responseId
router.route('/:responseId').get(getSingleResponse);

module.exports = router;
