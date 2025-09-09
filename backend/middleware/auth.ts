import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase';

export async function authenticate (req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(400).json({ error: "unauthorized" });
  }

  const idToken = header.split("Bearer ")[1];

  try {
    const decoded = await auth.verifyIdToken(idToken);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: `Invalid token: ${error}`});
  }
}