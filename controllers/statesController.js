const State = require('../model/State');
const statesJson = require('../public/json/states.json');

// Returns all data for all states
const getAllStates = (req, res) => {
  // TODO Blackboard says we must attach fun facts here, but his example does not
  // TODO What is correct? Theres a function below to help with this

  const states = statesJson;

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

// Unneeded currently
// TODO delete later
/* const joinStatesWithFunFacts = (statesJson, dbJson) => {
    // TODO simplify
    const result = statesJson.map( stateJson => {
        // Get the state code
        const stateCode = stateJson.code;

        // Find the matching fun facts in the dbJson, if any
        const facts = dbJson.find(state => state.statecode === stateCode)

        // Join the fun facts to the stateJson
        stateJson.

        // Return the result

    })

    return result;
} */
