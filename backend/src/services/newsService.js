import { prisma } from '../config/db.js';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { fetchFromProviders } from './newsProviders.js';
import { inferGeoFromText } from '../utils/geo.js';
import { buildDedupHash, detectCategory, isRecent, normalizeSummary } from '../utils/news.js';

export async function ingestLatestNews() {
  const articles = await fetchFromProviders();
  let inserted = 0;

  for (const article of articles) {
    if (!article.url || !article.title || !isRecent(article.publishedAt, env.newsWindowHours)) continue;

    const combinedText = `${article.title} ${article.summary} ${article.rawText}`;
    const geo = inferGeoFromText(combinedText);
    const dedupHash = buildDedupHash(article);

    try {
      await prisma.news.upsert({
        where: { dedupHash },
        update: {
          summary: normalizeSummary(article.summary),
          imageUrl: article.imageUrl,
          publishedAt: new Date(article.publishedAt)
        },
        create: {
          title: article.title,
          summary: normalizeSummary(article.summary),
          url: article.url,
          imageUrl: article.imageUrl,
          sourceName: article.sourceName,
          category: detectCategory(combinedText),
          country: geo.country,
          latitude: geo.lat,
          longitude: geo.lng,
          publishedAt: new Date(article.publishedAt),
          dedupHash,
          apiProvider: article.provider
        }
      });
      inserted += 1;
    } catch (error) {
      logger.debug({ err: error, url: article.url }, 'Skipped duplicate or invalid record.');
    }
  }

  const cutoff = new Date(Date.now() - env.newsWindowHours * 60 * 60 * 1000);
  await prisma.news.deleteMany({ where: { publishedAt: { lt: cutoff } } });
  logger.info({ inserted, scanned: articles.length }, 'Ingestion finished.');

  return { inserted, scanned: articles.length };
}

export async function getNews(filters) {
  const where = {
    ...(filters.category ? { category: filters.category } : {}),
    ...(filters.country ? { country: filters.country } : {}),
    ...(filters.search
      ? {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { summary: { contains: filters.search, mode: 'insensitive' } },
            { sourceName: { contains: filters.search, mode: 'insensitive' } }
          ]
        }
      : {})
  };

  return prisma.news.findMany({
    where,
    take: Number(filters.limit || 200),
    orderBy: { publishedAt: 'desc' }
  });
}

export async function getStats() {
  const total = await prisma.news.count();
  const byCategory = await prisma.news.groupBy({ by: ['category'], _count: true });
  const byCountry = await prisma.news.groupBy({ by: ['country'], _count: true });
  return { total, byCategory, byCountry };
}
