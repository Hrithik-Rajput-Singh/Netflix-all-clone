const jwt = require("jsonwebtoken");

//these is connecpt of jwt check the site bascially these is a mmiddleware which is comapring access token
function Verify(req, res, next) {
  const authHeader = req.headers.token; //token here is Headers key

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.CRYPTO_SECRET_KEY, (err, userInfo) => {
      if (err) res.status(403).json("TOKKEN IS INVALID");
      req.user = userInfo;
      next();
    }); //these userinfo is (id and isAdmin) what we saved in auth
  } else {
    res.status(401).json("YOUR NOT AUTHENTICATE");
  }
}

module.exports = Verify;
