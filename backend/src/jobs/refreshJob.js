import cron from 'node-cron';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { ingestLatestNews } from '../services/newsService.js';

export function scheduleNewsRefresh() {
  cron.schedule(env.refreshCron, async () => {
    try {
      await ingestLatestNews();
    } catch (error) {
      logger.error({ err: error }, 'Scheduled ingestion failed.');
    }
  });

  logger.info({ cron: env.refreshCron }, 'News refresh scheduler started.');
}
