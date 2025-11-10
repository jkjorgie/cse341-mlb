const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllWinners = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("cy_young_winners")
    .find();
  result.toArray().then((winners) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(winners);
  });
};

const getSingleWinner = async (req, res) => {
  const winnerId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("cy_young_winners")
    .find({ _id: winnerId });
  result.toArray().then((winners) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(winners[0]);
  });
};

const createWinner = async (req, res) => {
  const winner = {
    year: req.body.year,
    league: req.body.league,
    playerName: req.body.playerName,
    team: req.body.team,
    wins: req.body.wins,
    losses: req.body.losses,
    era: req.body.era,
    strikeouts: req.body.strikeouts,
    inningsPitched: req.body.inningsPitched,
    saves: req.body.saves,
    war: req.body.war,
    whip: req.body.whip,
    age: req.body.age,
    position: req.body.position,
    allStarAppearances: req.body.allStarAppearances,
    otherAwards: req.body.otherAwards,
    careerCyYoungWins: req.body.careerCyYoungWins,
    hallOfFame: req.body.hallOfFame,
    rookieOfTheYear: req.body.rookieOfTheYear,
    mvpFinish: req.body.mvpFinish,
    eraPlus: req.body.eraPlus,
    fip: req.body.fip,
    completeGames: req.body.completeGames,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("cy_young_winners")
    .insertOne(winner);

  if (response && response.acknowledged) {
    return res.status(201).json({ _id: response.insertedId, ...winner });
  }
  return res
    .status(500)
    .json({ message: "An error occurred while creating the Cy Young winner" });
};

const updateWinner = async (req, res) => {
  const winnerId = new ObjectId(req.params.id);
  const winner = {
    year: req.body.year,
    league: req.body.league,
    playerName: req.body.playerName,
    team: req.body.team,
    wins: req.body.wins,
    losses: req.body.losses,
    era: req.body.era,
    strikeouts: req.body.strikeouts,
    inningsPitched: req.body.inningsPitched,
    saves: req.body.saves,
    war: req.body.war,
    whip: req.body.whip,
    age: req.body.age,
    position: req.body.position,
    allStarAppearances: req.body.allStarAppearances,
    otherAwards: req.body.otherAwards,
    careerCyYoungWins: req.body.careerCyYoungWins,
    hallOfFame: req.body.hallOfFame,
    rookieOfTheYear: req.body.rookieOfTheYear,
    mvpFinish: req.body.mvpFinish,
    eraPlus: req.body.eraPlus,
    fip: req.body.fip,
    completeGames: req.body.completeGames,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("cy_young_winners")
    .replaceOne({ _id: winnerId }, winner);
  if (response && (response.modifiedCount > 0 || response.matchedCount > 0)) {
    return res.status(204).send();
  }
  return res
    .status(500)
    .json({ message: "An error occurred while updating the Cy Young winner" });
};

const deleteWinner = async (req, res) => {
  const winnerId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("cy_young_winners")
    .deleteOne({ _id: winnerId });
  if (response && response.deletedCount > 0) {
    return res.status(204).send();
  }
  return res
    .status(500)
    .json({ message: "An error occurred while deleting the Cy Young winner" });
};

module.exports = {
  getAllWinners,
  getSingleWinner,
  createWinner,
  updateWinner,
  deleteWinner,
};
