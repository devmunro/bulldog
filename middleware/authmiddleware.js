import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);

    // Attach the decoded token to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
