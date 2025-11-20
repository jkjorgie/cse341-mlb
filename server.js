require("dotenv").config();
const express = require("express");
const mongodb = require("./data/database");
const session = require("express-session");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

// Passport configuration
require("./config/passport")(passport);

// Middlewares
app.use(bodyParser.json());

// Session configuration (must be before passport)
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS middleware
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

// Routes
const routes = require("./routes");
app.use("/", routes);

// Start server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`MLB Data API listening on port ${port}`);
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});

module.exports = app;
