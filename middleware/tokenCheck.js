const jwt = require("jsonwebtoken");

function tokenCheck(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token nahi hai! Access nahi!" });
  }
  try {
    const decoded = jwt.verify(token, "secret123");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token galat hai!" });
  }
}

module.exports = tokenCheck;