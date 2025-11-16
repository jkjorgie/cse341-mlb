const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const {
  toNumber,
  toBoolean,
  trimString,
  validateRequiredStrings,
  validateNumericFields,
  validateBooleanFields,
} = require("./utilities");

const validateWinner = (body) => {
  const errors = [];

  const winner = {
    year: toNumber(body.year),
    league: trimString(body.league),
    playerName: trimString(body.playerName),
    team: trimString(body.team),
    wins: toNumber(body.wins),
    losses: toNumber(body.losses),
    era: toNumber(body.era),
    strikeouts: toNumber(body.strikeouts),
    inningsPitched: toNumber(body.inningsPitched),
    saves: toNumber(body.saves),
    war: toNumber(body.war),
    whip: toNumber(body.whip),
    age: toNumber(body.age),
    position: trimString(body.position),
    allStarAppearances: toNumber(body.allStarAppearances),
    otherAwards: body.otherAwards, // allow string or array
    careerCyYoungWins: toNumber(body.careerCyYoungWins),
    hallOfFame: toBoolean(body.hallOfFame),
    rookieOfTheYear: toBoolean(body.rookieOfTheYear),
    mvpFinish:
      body.mvpFinish === undefined ||
      body.mvpFinish === null ||
      body.mvpFinish === ""
        ? undefined
        : Number.isFinite(Number(body.mvpFinish))
        ? Number(body.mvpFinish)
        : body.mvpFinish, // accept string like "2nd" or number
    eraPlus: toNumber(body.eraPlus),
    fip: toNumber(body.fip),
    completeGames: toNumber(body.completeGames),
  };

  // Required core fields
  if (!Number.isInteger(winner.year)) {
    errors.push("year is required and must be an integer");
  }
  validateRequiredStrings(winner, ["league", "playerName", "team"], errors);

  // Numeric-if-provided validations
  validateNumericFields(
    winner,
    [
      "wins",
      "losses",
      "era",
      "strikeouts",
      "inningsPitched",
      "saves",
      "war",
      "whip",
      "age",
      "allStarAppearances",
      "careerCyYoungWins",
      "eraPlus",
      "fip",
      "completeGames",
    ],
    errors
  );

  // Boolean-if-provided validations
  validateBooleanFields(winner, ["hallOfFame", "rookieOfTheYear"], errors);

  return { errors, winner };
};

const getAllWinners = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cy_young_winners")
      .find();
    result
      .toArray()
      .then((winners) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(winners);
      })
      .catch((err) => {
        console.error("Error retrieving winners:", err);
        res.status(500).json({
          message: "An error occurred while retrieving Cy Young winners",
        });
      });
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while connecting to the database" });
  }
};

const getSingleWinner = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Winner ID is required" });
    }

    let winnerId;
    try {
      winnerId = new ObjectId(req.params.id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid winner ID format" });
    }

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cy_young_winners")
      .find({ _id: winnerId });
    result
      .toArray()
      .then((winners) => {
        if (winners.length === 0) {
          return res.status(404).json({ message: "Cy Young winner not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(winners[0]);
      })
      .catch((err) => {
        console.error("Error retrieving winner:", err);
        res.status(500).json({
          message: "An error occurred while retrieving the Cy Young winner",
        });
      });
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while connecting to the database" });
  }
};

const createWinner = async (req, res) => {
  try {
    const { errors, winner } = validateWinner(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("cy_young_winners")
      .insertOne(winner);

    if (response && response.acknowledged) {
      return res.status(201).json({ _id: response.insertedId, ...winner });
    }
    return res.status(500).json({
      message: "An error occurred while creating the Cy Young winner",
    });
  } catch (error) {
    console.error("Error creating Cy Young winner:", error);
    return res.status(500).json({
      message: "An error occurred while creating the Cy Young winner",
    });
  }
};

const updateWinner = async (req, res) => {
  try {
    let winnerId;
    try {
      winnerId = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(400).json({ message: "Invalid winner ID format" });
    }
    const { errors, winner } = validateWinner(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("cy_young_winners")
      .replaceOne({ _id: winnerId }, winner);
    if (response && (response.modifiedCount > 0 || response.matchedCount > 0)) {
      return res.status(204).send();
    }
    return res.status(500).json({
      message: "An error occurred while updating the Cy Young winner",
    });
  } catch (error) {
    console.error("Error updating Cy Young winner:", error);
    return res.status(500).json({
      message: "An error occurred while updating the Cy Young winner",
    });
  }
};

const deleteWinner = async (req, res) => {
  try {
    let winnerId;
    try {
      winnerId = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(400).json({ message: "Invalid winner ID format" });
    }

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("cy_young_winners")
      .deleteOne({ _id: winnerId });
    if (response && response.deletedCount > 0) {
      return res.status(204).send();
    }
    return res.status(500).json({
      message: "An error occurred while deleting the Cy Young winner",
    });
  } catch (error) {
    console.error("Error deleting Cy Young winner:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the Cy Young winner",
    });
  }
};

module.exports = {
  getAllWinners,
  getSingleWinner,
  createWinner,
  updateWinner,
  deleteWinner,
};
