// Loading all the environment(dotenv) variables onto process.env.____
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json()); // json - for building the API
// -----------------------------------------------

// all my routes are "pre-fixed"
app.use("/api/auth", authRoutes);

app.use(
  "/api/users/:id/messages",
  loginRequired, // makes sure the user is logged in - Authentication
  ensureCorrectUser, // makes sure to get the correct user - Authorization
  messagesRoutes
);


// Get all of the messages for every single user
// Only if a users is logged in
app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
    });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

//--------------------------------------------------------------
// Error Handler
app.use(function(req,res, next) { // next - for the next piece of middleware
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// Nicer way to display errors with json
app.use(errorHandler);


app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`)
});
