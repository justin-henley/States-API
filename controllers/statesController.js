const State = require('../model/State');
const statesJson = require('../public/json/states.json');

// Returns all data for all states
const getAllStates = async (req, res) => {
  // TODO Blackboard says we must attach fun facts here, but his example does not
  // TODO What is correct? Theres a function below to help with this
  const dbJson = await State.find();

  const states = joinStatesWithFunFacts(statesJson, dbJson);

  // Check if any data was found
  if (!states) {
    return res.status(204).json({ message: 'No states found.' });
  }

  // Return the data as json
  res.json(states);
};

// Returns all data for a single state
const getState = async (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State ID required' });
  }

  // Find the state and its fun facts
  const state = statesJson.find((state) => state.code === req.params.state);
  const funfacts = await State.find({ statecode: req.params.state });
  state.funfacts = funfacts || [];

  // Respond with JSON
  res.json(state);
};

// Returns the capital of a given state
const getStateCapital = (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State ID required' });
  }

  // Find the state and its capital
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return only the state name and capital
  res.json({
    state: state.state,
    capital: state.capital_city,
  });
};

// Returns the nickname of a given state
const getStateNickname = (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State ID required' });
  }

  // Find the state and its nickname
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return only the state name and nickname
  res.json({
    state: state.state,
    nickname: state.nickname,
  });
};

// Returns the population of a given state
const getStatePopulation = (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State ID required' });
  }

  // Find the state and its population
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return only the state name and population
  res.json({
    state: state.state,
    population: state.population,
  });
};

// Returns the population of a given state
const getStateAdmission = (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State ID required' });
  }

  // Find the state and its admission
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return only the state name and admission
  res.json({
    state: state.state,
    admitted: state.admission_date,
  });
};

// Export all functions
module.exports = {
  getAllStates,
  getState,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateAdmission,
};

// Unclear if needed currently
// TODO delete later if not
const joinStatesWithFunFacts = (statesJson, dbJson) => {
  return statesJson.map((stateJson) => {
    // Get the state code
    const stateCode = stateJson.code;

    // Find the matching fun facts in the dbJson, if any
    const facts = dbJson.find((state) => state.statecode === stateCode);

    // Join the fun facts to the stateJson
    stateJson.funfacts = facts?.funfacts || [];

    // Return the result
    return stateJson;
  });
};
