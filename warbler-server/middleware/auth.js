require("dotenv").config();
let jwt = require("jsonwebtoken");

// MIDDLEWARE - sits between the request and the handler

// makes sure the user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
  try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer dsfdfgdgd
      // payload/decoded token
      jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
        if(payload) {
          return next();
        } else {
          return next({
            status: 401, // unauthorized
            message: "Please log in first"
          });
        }
      });
    } catch (e) {
    return next({
      status: 401, // unauthorized
      message: "Please log in first",
    });
  }
};



// makes sure to get the correct user - Authorization
// /api/users/:id/messages
exports.ensureCorrectUser= function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // payload/decoded token
    jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
      // Prevent users from tampering with other users information
      if(payload && payload.id === req.params.id) {  // token payload.id matches what's in url
        return next();
      } else {
        return next({
          status: 401, // unauthorized
          message: "Unauthorized"
        });
      }
    });
  } catch (e) {
    return next({
      status: 401,  // unauthorized
      message: "Unauthorized",
    });
  }
};