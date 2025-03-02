const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("user decoded", req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("user present", req.user);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission Denied" });
    }
    next();
  };
};
