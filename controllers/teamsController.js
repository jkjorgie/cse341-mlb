const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllTeams = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("teams").find();
  result.toArray().then((teams) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(teams);
  });
};

const getSingleTeam = async (req, res) => {
  const teamId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("teams")
    .find({ _id: teamId });
  result.toArray().then((teams) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(teams[0]);
  });
};

const createTeam = async (req, res) => {
  const team = {
    teamName: req.body.teamName,
    nickname: req.body.nickname,
    city: req.body.city,
    state: req.body.state,
    stadium: req.body.stadium,
    founded: req.body.founded,
    league: req.body.league,
    division: req.body.division,
    worldSeriesWins: req.body.worldSeriesWins,
    currentManager: req.body.currentManager,
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor,
    website: req.body.website,
    twitter: req.body.twitter,
    ballparkCapacity: req.body.ballparkCapacity,
    owner: req.body.owner,
    mascot: req.body.mascot,
    firstSeason: req.body.firstSeason,
    franchiseValue: req.body.franchiseValue,
    payroll: req.body.payroll,
    divisionTitles: req.body.divisionTitles,
    pennantWins: req.body.pennantWins,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("teams")
    .insertOne(team);

  if (response && response.acknowledged) {
    return res.status(201).json({ _id: response.insertedId, ...team });
  }
  return res
    .status(500)
    .json({ message: "An error occurred while creating the team" });
};

const updateTeam = async (req, res) => {
  const teamId = new ObjectId(req.params.id);
  const team = {
    teamName: req.body.teamName,
    nickname: req.body.nickname,
    city: req.body.city,
    state: req.body.state,
    stadium: req.body.stadium,
    founded: req.body.founded,
    league: req.body.league,
    division: req.body.division,
    worldSeriesWins: req.body.worldSeriesWins,
    currentManager: req.body.currentManager,
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor,
    website: req.body.website,
    twitter: req.body.twitter,
    ballparkCapacity: req.body.ballparkCapacity,
    owner: req.body.owner,
    mascot: req.body.mascot,
    firstSeason: req.body.firstSeason,
    franchiseValue: req.body.franchiseValue,
    payroll: req.body.payroll,
    divisionTitles: req.body.divisionTitles,
    pennantWins: req.body.pennantWins,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("teams")
    .replaceOne({ _id: teamId }, team);
  if (response && (response.modifiedCount > 0 || response.matchedCount > 0)) {
    return res.status(204).send();
  }
  return res
    .status(500)
    .json({ message: "An error occurred while updating the team" });
};

const deleteTeam = async (req, res) => {
  const teamId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("teams")
    .deleteOne({ _id: teamId });
  if (response && response.deletedCount > 0) {
    return res.status(204).send();
  }
  return res
    .status(500)
    .json({ message: "An error occurred while deleting the team" });
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};
