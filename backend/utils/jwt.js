const jwt = require("jsonwebtoken");
const config = require("../config/config");

const secret = config.env.app.jwtSecretKey;

const createJwtToken= (data,expiresIn)=>{
    if (!secret) {
        throw new Error("JWT Secret is not defined");
      }
    
      return jwt.sign(data, secret, { expiresIn: expiresIn });
}

const validateJwtToken=(token)=>{
    if (!secret) {
        throw new Error("JWT Secret is not defined");
      }
    
      try {
        const decoded = jwt.verify(token, secret);
        return decoded;
      } catch (err) {
        console.log(err);
      }
}

const decodeJwtToken=(res,token)=>{
    const decoded = validateJWTToken(token);

  // Check if the token is expired
  if (decoded.exp <= Date.now() / 1000) {
    return res.status(400).json({
        message: "Token has expired",
      });
  }
  return decoded;
}
module.exports={
    createJwtToken,
    validateJwtToken,
    decodeJwtToken
}