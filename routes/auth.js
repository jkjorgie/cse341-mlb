const express = require("express");
const router = express.Router();
const passport = require("passport");

// #swagger.tags = ['authentication']
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// #swagger.tags = ['authentication']
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/login-failed" }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect("/");
  }
);

// #swagger.tags = ['authentication']
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.json({ message: "Successfully logged out" });
    });
  });
});

// #swagger.tags = ['authentication']
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

// #swagger.tags = ['authentication']
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl,
      },
    });
  } else {
    res.status(401).json({
      authenticated: false,
      message: "Not authenticated",
    });
  }
});

module.exports = router;
