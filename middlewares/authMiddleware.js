const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔐 step 1: check header
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // 🔐 step 2: extract token
    const token = authHeader.split(" ")[1];

    // 🔐 step 3: verify token
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorized User",
        });
      }

      // 🔐 step 4: attach user info safely
      req.userId = decoded.id;
      next(); // 🔥 THIS ALLOWS REQUEST TO CONTINUE
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Auth Middleware Error",
      error,
    });
  }
};
