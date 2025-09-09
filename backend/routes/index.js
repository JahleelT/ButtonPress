import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/public', (req, res) => {
  res.json({ message: "Public endpoint saying hello now"});
});

router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Protected endpoint", user: (req).user });
});

export default router;