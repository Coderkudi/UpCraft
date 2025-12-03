import { verifyAccessToken } from "../utils/jwt.js";

export default async (req, res, next) => {
  const header = req.headers.authorization;
  console.log("headers: ", header);
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = header.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.id };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
