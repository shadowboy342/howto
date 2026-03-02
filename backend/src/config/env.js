import dotenv from 'dotenv';

dotenv.config();

const required = ['DATABASE_URL'];
for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Missing required env var: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  newsApiKey: process.env.NEWS_API_KEY,
  gnewsApiKey: process.env.GNEWS_API_KEY,
  adminToken: process.env.ADMIN_TOKEN || 'change-me',
  refreshCron: process.env.REFRESH_CRON || '*/10 * * * *',
  newsWindowHours: Number(process.env.NEWS_WINDOW_HOURS || 48)
};
