const session = require("express-session");

// Configure session middleware with specific settings
const sessionConfig = session({
  // Secret key used to sign the session ID cookie
  secret: "kuku",
  resave: false,

  // Save new sessions even if they haven't been modified
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true in production with HTTPS
});

module.exports = sessionConfig;
