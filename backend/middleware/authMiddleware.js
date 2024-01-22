const { validateJwtToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = validateJwtToken(token);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: "Internal Server error",
    });
  }
};
module.exports = authMiddleware;
