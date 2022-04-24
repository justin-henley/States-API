const State = require('../model/State');
const statesJson = require('../public/json/states.json');

// Returns a single random fact for the given state
const getRandomFact = async (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }

  // Get all fun facts for the given state
  const state = await State.findOne({ statecode: req.params.state });
  const facts = state?.funfacts;

  // Ensure results were found
  if (!facts) {
    // Find the name of the state
    const stateName = statesJson.find(
      (state) => state.code === req.params.state
    ).state;

    // Return JSON message that no facts were found
    res.json({ message: `No Fun Facts found for ${stateName}` });
  } else {
    // Choose random fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    // Return the fact alone as json
    res.json({
      funfact: randomFact,
    });
  }
};

// Create a new random fact entry in the database
/*
    INPUT:
    {
        "funfacts": [
            "Alabama is a state",
            "In Alabama, trees are called bumblesnoots."
        ]
    }
    OUTPUT:
    {
        "stateCode": "AL",
        "funfacts": [
            "Alabama is a state",
            "In Alabama, trees are called bumblesnoots."
        ],
        "_id": "62616d0b719d8e20a8898b11",
        "__v": 0
    }
*/
const createFact = async (req, res) => {
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }
  if (!req?.body?.funfacts) {
    return res
      .status(400)
      .json({ message: 'A string array of funfacts is required.' });
  }

  // Check if an entry for this state already exists
  const state = await State.findOne({ statecode: req.params.state }).exec();

  if (state) {
    // If yes, push new funfacts to the entry
    state.funfacts.push(...req.body.funfacts);

    // Save the modified entry
    const result = await state.save();

    // Return the saved results
    res.json(result);
  } else {
    // If no, create a new entry
    try {
      const result = await State.create({
        statecode: req.params.state,
        funfacts: [...req.body.funfacts],
      });

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
};

// Modify an existing fact entry
/*
    INPUT:
    {
        "index": 2,
        "funfact": "In Alabama, beds are where people sleep."
    }
    OUTPUT:
    {
        "_id": "62616d0b719d8e20a8898b11",
        "stateCode": "AL",
        "funfacts": [
            "Alabama is a state",
            "In Alabama, beds are where people sleep."
        ],
        "__v": 0
    }
    FAILURE OUTPUT:
    {
        "message": "No Fun Fact found at that index for Alabama"
    }
*/
const modifyFact = async (req, res) => {
  // Store params for readability
  const stateCode = req?.params?.state;
  const index = req?.body?.index;
  const funfact = req?.body?.index;

  if (!stateCode) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }
  if (!index || funfact) {
    return res.status(400).json({
      message: 'An index and a string array of funfacts is required.',
    });
  }

  // Check if an entry for this state exists
  const state = await State.findOne({ statecode: stateCode }).exec();

  if (!state) {
    // No state record found in database
    // Find the name of the state
    const stateName = statesJson.find(
      (state) => state.code === stateCode
    ).state;

    // Return JSON message that no facts were found
    res.json({ message: `No Fun Facts found for ${stateName}` });
  } else if (index < 1 || index > state.funfacts.length) {
    // Invalid index
    res.json({ message: 'Index out of bounds.' });
  } else {
    // Modify the found entry
    state.funfacts[index] = funfact;

    // Save the modified entry
    const result = await state.save();

    // Return the saved results
    res.json(result);
  }
};

// Delete an existing fact entry
/*
    INPUT:
    {
        "index": 2
    }
    OUTPUT:
    {
        "_id": "62616d0b719d8e20a8898b11",
        "stateCode": "AL",
        "funfacts": [
            "Alabama is a state"
        ],
        "__v": 1
    }
*/
const deleteFact = async (req, res) => {
  // Ensure all required parameters were provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }
  if (!req?.body?.funfacts || !req?.body?.index) {
    return res.status(400).json({
      message: 'An index and a string array of funfacts is required.',
    });
  }

  // Check if an entry for this state exists
  const state = await State.findOne({ statecode: req.params.state }).exec();

  if (!state) {
    // No state record found in database
    // Find the name of the state
    const stateName = statesJson.find(
      (state) => state.code === stateCode
    ).state;

    // Return JSON message that no facts were found
    res.json({ message: `No Fun Facts found for ${stateName}` });
  } else if (index < 1 || index > state.funfacts.length) {
    // Invalid index
    res.json({ message: 'Index out of bounds.' });
  } else {
    // Modify the found entry
    state.funfacts.splice(index, 1);

    // Save the modified entry
    const result = await state.save();

    // Return the saved results
    res.json(result);
  }
};

// Export all functions
module.exports = {
  getRandomFact,
  createFact,
  modifyFact,
  deleteFact,
};