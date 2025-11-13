const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const {
  toNumber,
  trimString,
  validateRequiredStrings,
  validateNumericFields,
} = require("./utilities");

const validateTeam = (body) => {
  const errors = [];

  const team = {
    teamName: trimString(body.teamName),
    nickname: trimString(body.nickname),
    city: trimString(body.city),
    state: trimString(body.state),
    stadium: trimString(body.stadium),
    founded: toNumber(body.founded),
    league: trimString(body.league),
    division: trimString(body.division),
    worldSeriesWins: toNumber(body.worldSeriesWins),
    currentManager: trimString(body.currentManager),
    primaryColor: trimString(body.primaryColor),
    secondaryColor: trimString(body.secondaryColor),
    website: trimString(body.website),
    twitter: trimString(body.twitter),
    ballparkCapacity: toNumber(body.ballparkCapacity),
    owner: trimString(body.owner),
    mascot: trimString(body.mascot),
    firstSeason: toNumber(body.firstSeason),
    franchiseValue: toNumber(body.franchiseValue),
    payroll: toNumber(body.payroll),
    divisionTitles: toNumber(body.divisionTitles),
    pennantWins: toNumber(body.pennantWins),
  };

  // Required string fields
  validateRequiredStrings(
    team,
    ["teamName", "city", "league", "division"],
    errors
  );

  // Numeric fields: if provided, must be valid numbers
  validateNumericFields(
    team,
    [
      "founded",
      "worldSeriesWins",
      "ballparkCapacity",
      "firstSeason",
      "franchiseValue",
      "payroll",
      "divisionTitles",
      "pennantWins",
    ],
    errors
  );

  return { errors, team };
};

const getAllTeams = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("teams").find();
    result
      .toArray()
      .then((teams) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(teams);
      })
      .catch((err) => {
        console.error("Error retrieving teams:", err);
        res
          .status(500)
          .json({ message: "An error occurred while retrieving teams" });
      });
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while connecting to the database" });
  }
};

const getSingleTeam = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Team ID is required" });
    }

    let teamId;
    try {
      teamId = new ObjectId(req.params.id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid team ID format" });
    }

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("teams")
      .find({ _id: teamId });
    result
      .toArray()
      .then((teams) => {
        if (teams.length === 0) {
          return res.status(404).json({ message: "Team not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(teams[0]);
      })
      .catch((err) => {
        console.error("Error retrieving team:", err);
        res
          .status(500)
          .json({ message: "An error occurred while retrieving the team" });
      });
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while connecting to the database" });
  }
};

const createTeam = async (req, res) => {
  const { errors, team } = validateTeam(req.body);
  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

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
  let teamId;
  try {
    teamId = new ObjectId(req.params.id);
  } catch (e) {
    return res.status(400).json({ message: "Invalid team ID format" });
  }

  const { errors, team } = validateTeam(req.body);
  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }
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
