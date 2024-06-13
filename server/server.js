// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const http = require("http");
const Gun = require("gun");

const healthRouter = require("./routes/health.router");
const authRouter = require("./routes/auth.router");
require("./passportConfig")(passport);

const app = express();
const corsOptions = {
  origin: 'http://172.16.131.85:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://172.16.131.85:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use("/health", healthRouter);
app.use("/auth", authRouter);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("API error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const server = http.createServer(app);

// GUN Integration
const gun = Gun({
  web: server  // Attaching GUN to the HTTP server
});

// Event listeners for peer connections on GUN
gun.on("hi", peer => {
  console.log("Peer connected:", peer);
});

gun.on("bye", peer => {
  console.log("Peer disconnected:", peer);
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
