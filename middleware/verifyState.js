const statesJson = require('../public/json/states.json');

const verifyState = (req, res, next) => {
  // Store the state code for readability
  const stateCode = req?.params?.state?.toUpperCase();

  // Check that a state code was provided
  if (!stateCode) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }

  // Get an array of all valid state codes
  const validStateCodes = statesJson.map((state) => state.code);

  // Check if the given code is valid
  if (validStateCodes.indexOf(stateCode) !== -1) {
    // Reattach the capitalized state code to the request and continue
    req.params.state = stateCode;
    next();
  } else {
    // todo
    res.status(400).json({ message: 'Invalid state abbreviation parameter' });
  }
};

module.exports = verifyState;
