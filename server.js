const express = require("express");
const mongodb = require("./data/database");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const routes = require("./routes");

// m,iddlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

//routes
app.use("/", routes);

// Start server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`🏏 MLB Data API listening on port ${port}`);
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  }
});

module.exports = app;
