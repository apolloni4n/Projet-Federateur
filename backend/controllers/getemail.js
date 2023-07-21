const jwt_decode = require("jwt-decode");

exports.getemail = (req, res) => {console.log(req.cookiers.jwt);
  var token = req.cookies.jwt
  var email= jwt_decode(token)["email"]
  return email;
};

