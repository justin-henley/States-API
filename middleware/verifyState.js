const statesJson = require('../public/json/states.json');

const verifyState = (req, res, next) => {
  // Store the state code for readability
  const stateCode = req?.params?.state; //.toUpperCase();
  console.log(req?.params?.state, stateCode);
  // Check that a state code was provided
  if (!stateCode) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }

  // Get an array of all valid state codes
  const validStateCodes = statesJson.map((state) => state.code);
  console.log(stateCode, validStateCodes);
  // Check if the given code is valid
  if (validStateCodes.indexOf(stateCode) !== -1) {
    // Reattach the capitalized state code to the request and continue
    req.params.state = stateCode;
    next();
  } else {
    // todo
    res.status(400).json({ message: "Nope that don't work" });
  }
};

module.exports = verifyState;
