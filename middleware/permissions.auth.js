const jwt = require("jsonwebtoken");

const verifyToken = (req) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return "NO_TOKEN";
    }
    token = token.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return "INVALID_TOKEN";
    }

    req.user = verified;
    req.isAuth = true;
    return "OK";
  } catch (err) {
    return { type: "ERROR_VERIFYING", err };
  }
  // return res.json({ token: token || "NO_TOKEN", name: "NOOR" });
};
const isUserAuthenticated = (req, res, next) => {

  if (!req.header("Authorization") && !req.user && !req.isAuthenticated()) {
    return res.status(403).json({ msg: "NO TOKEN, can't access resource" });
  } else if (req.user && req.isAuthenticated()) {
    return next();
  } else {
    const isVerified = verifyToken(req);
    if (isVerified === "INVALID_TOKEN") {
      return res
        .status(403)
        .json({ msg: "CANNOT ACCESS RESOURCE", rs: "INVALID TOKEN" });
    }
    if (isVerified === "NO_TOKEN") {
      return res
        .status(403)
        .json({ msg: "CANNOT ACCESS RESOURCE", rs: "NO TOKEN" });
    }
    if (isVerified.type === "ERROR_VERIFYING") {
      const { err } = isVerified;
      return res
        .status(500)
        .json({ error: err.message, msg: "UNABLE_TO_VERIFY_THE_TOKEN" });
    }
    if (isVerified === "OK") {
      next();
    }
  }
};

module.exports = { isUserAuthenticated, verifyToken };
