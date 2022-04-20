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

// Export all functions
module.exports = {
  getAllStates,
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
