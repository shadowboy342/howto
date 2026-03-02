import { Router } from 'express';
import { getNews, ingestLatestNews } from '../services/newsService.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const news = await getNews({
      category: req.query.category,
      country: req.query.country,
      search: req.query.search,
      limit: req.query.limit
    });

    res.json(news);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', requireAdmin, async (req, res, next) => {
  try {
    const result = await ingestLatestNews();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
