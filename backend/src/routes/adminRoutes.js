import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import { getStats } from '../services/newsService.js';

const router = Router();

router.get('/stats', requireAdmin, async (req, res, next) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;
