import jwt from "jsonwebtoken";

export const verifyUserToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send("Access denied. Please login to carryout this operation");

  try {
    const verified = jwt.verify(token, process.env.USER_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Authenticate to carry out operation");
  }
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send("Authenticate to carry out operation");

  try {
    const verified = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
    req.admin = verified;
    next();
  } catch (error) {
    res
      .status(400)
      .send("Access denied. Only Admin can carry out this operation");
  }
};
