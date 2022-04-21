const State = require('../model/State');
const statesJson = require('../public/json/states.json');

// Returns a single random fact for the given state
const getRandomFact = async (req, res) => {
  // Check that an state was provided
  if (!req?.params?.state) {
    return res.status(400).json({ message: 'State ID required' });
  }

  // Get all fun facts for the given state
  const state = await State.find({ statecode: req.params.state });
  const facts = state[0].funfacts;

  // Ensure results were found
  if (!facts) {
    // Find the name of the state
    const stateName = statesJson.find(
      (state) => state.code === req.params.state
    ).state;

    // Return JSON message that no facts were found
    res.json({ message: `No Fun Facts Found for ${stateName}` });
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
const createFact = async (req, res) => {};

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
*/
const modifyFact = async (req, res) => {};

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
const deleteFact = async (req, res) => {};

// Export all functions
module.exports = {
  getRandomFact,
  createFact,
  modifyFact,
  deleteFact,
};
