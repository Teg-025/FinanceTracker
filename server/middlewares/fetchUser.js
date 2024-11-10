const jwt = require("jsonwebtoken");
const JWT_secret = "$love$eldenring";
const fetchUser = (req, res, next) => {
  try {
    //get the user from jwt token and id to req obj

    const token = req.header("authToken");
    if (!token) {
      res.status(401).json({ error: "authenticate using valid token" });
    }
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (err) {
    console.error("middlewareerror ", err);
  }
};

module.exports = fetchUser;
