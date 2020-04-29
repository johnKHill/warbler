const db = require("../models");
// Used to create jwt. A tool to mark user as logged in.
// Checks if jwt exists from when the user signs up succesfully or logs in
const jwt = require("jsonwebtoken");


// SIGNIN
exports.signin = async function(req, res, next) {
  // finding a user
  try {
    let user =  await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl} = user
    // checking if their password matches what was sent to the server
    let isMatch = await user.comparePassword(req.body.password);
    // if it all matches
    if(isMatch) {
      // create the token to log them in
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch(e){
      return next({
        status: 400,
        message: "Invalid Email/Password."
      })
  }
};



// SIGNUP
exports.signup = async function(req, res, next) {
  try {
    // create a user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    // create a token (signing a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl,
      },
      // process.env.SECRET_KEY
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // if a validation fails (this is standard)
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    // otherwise just send back a generic 404
    return next({
      status: 400,
      message: err.message
    });
  }
};