import { auth } from '../firebase.js';

export async function authenticate (req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(400).json({ error: "unauthorized" });
  }

  const idToken = header.split("Bearer ")[1];

  try {
    const decoded = await auth.verifyIdToken(idToken);
    (req).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: `Invalid token: ${error}`});
  }
}