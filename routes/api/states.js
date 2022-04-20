const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/').get(statesController.getAllStates).post().patch().delete();

// Other routes like :state go here

module.exports = router;
