import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import newsRoutes from './routes/newsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { ingestLatestNews } from './services/newsService.js';
import { scheduleNewsRefresh } from './jobs/refreshJob.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(env.port, async () => {
  logger.info(`Backend running on :${env.port}`);
  await ingestLatestNews();
  scheduleNewsRefresh();
});
