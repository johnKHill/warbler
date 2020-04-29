const mongoose = require("mongoose"); // ODM
mongoose.set("debug", true); // see mongo queries in terminal
mongoose.set("useCreateIndex", true); // removes warning from deprecation
mongoose.Promise = Promise; // ES2015 Promise library - don't have to use a callback pattern
// connect to a DB
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true, // keeps connection stable
  useNewUrlParser: true, // removes warning from deprecation
  useUnifiedTopology: true, // removes warning from deprecation
});

module.exports.User = require("./user");
module.exports.Message = require("./message");