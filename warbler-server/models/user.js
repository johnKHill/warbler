const mongoose = require("mongoose");
// Takes a plain text password and turns
// it into something that can't be reversed
const bcrypt = require("bcrypt"); // password hashing

const userSchema = new mongoose.Schema({
  // the fields we want each document to have
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ]
});

// Modifying the password by hashing and adding
// a "pre Hook" on the userSchema before the save in the db - pre("save")
userSchema.pre("save", async function(next) { // next meaning express move-on
  try {
    if(!this.isModified("password")) {
        return next();
    }
    // Salt/work factor - taking additional info
    //and putting it in a hash. For security
    let hashedPassword = await bcrypt.hash(this.password, 10); // bcrypt is asynchronous
    this.password = hashedPassword;
    return next();
  } catch(err) {
    return next(err);
  }
});

// helper function - instance method that every document will have
// making sure the user has successfully put in the right password
userSchema.methods.comparePassword = async function (candidatePassword, next) {   // next meaning express move-on
  try {
    // checking if their password matches what's in the DB
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};


// Every single object created from the Schema,
// is going to be done through a "MODEL".
const User = mongoose.model("User", userSchema);

module.exports = User;