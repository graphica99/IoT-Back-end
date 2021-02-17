const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    const error = new Error("Not authenticated.");
    throw error;
    // return res.status(401).json({ msg: "No token available, authorization failed" });
  }
  try {
    const decoded = jwt.verify(token, 'ilovetocode');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
