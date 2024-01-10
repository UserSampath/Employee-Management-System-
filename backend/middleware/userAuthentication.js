const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const userAuthentication = async (req, res, next) => {
  try {
  const { authorization } = req.headers;
  if (!authorization) {
    req.id = "notAuthorized"
    next();
  }
  const token = authorization.split(" ")[1];
  
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.id = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = userAuthentication;
