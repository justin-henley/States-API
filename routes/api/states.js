const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

// Returns data for all states
router.route('/').get(statesController.getAllStates);

// Returns all data for a single state
router.route('/:state').get(statesController.getState);

// Returns a state name and capital city
router.route('/:state/capital').get(statesController.getStateCapital);

// Returns a state name and nickname
router.route('/:state/nickname').get(statesController.getStateNickname);

// Returns a state name and population
router.route('/:state/population').get(statesController.getStatePopulation);

// Returns a state name and admission date
router.route('/:state/admission').get(statesController.getStateAdmission);

// State fun facts
router.route('/:state/funfact').get().post().patch().delete();

module.exports = router;
