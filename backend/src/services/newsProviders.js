import axios from 'axios';
import NodeCache from 'node-cache';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

const cache = new NodeCache({ stdTTL: 60 * 5, useClones: false });
const middleEastQuery = 'Middle East OR الشرق الأوسط OR Gaza OR Israel OR Palestine OR Iraq OR Syria';

async function cachedGet(key, fn) {
  const hit = cache.get(key);
  if (hit) return hit;
  const data = await fn();
  cache.set(key, data);
  return data;
}

export async function fetchNewsApi() {
  if (!env.newsApiKey) return [];
  return cachedGet('newsapi', async () => {
    const url = 'https://newsapi.org/v2/everything';
    const { data } = await axios.get(url, {
      params: {
        q: middleEastQuery,
        language: 'ar,en',
        sortBy: 'publishedAt',
        pageSize: 100,
        apiKey: env.newsApiKey
      }
    });

    return (data.articles || []).map((item) => ({
      provider: 'newsapi',
      title: item.title,
      summary: item.description || item.content || '',
      url: item.url,
      imageUrl: item.urlToImage,
      sourceName: item.source?.name || 'Unknown',
      publishedAt: item.publishedAt,
      rawText: `${item.title || ''} ${item.description || ''} ${item.content || ''}`
    }));
  });
}

export async function fetchGNews() {
  if (!env.gnewsApiKey) return [];
  return cachedGet('gnews', async () => {
    const { data } = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: middleEastQuery,
        lang: 'ar,en',
        max: 50,
        sortby: 'publishedAt',
        token: env.gnewsApiKey
      }
    });

    return (data.articles || []).map((item) => ({
      provider: 'gnews',
      title: item.title,
      summary: item.description || item.content || '',
      url: item.url,
      imageUrl: item.image,
      sourceName: item.source?.name || 'Unknown',
      publishedAt: item.publishedAt,
      rawText: `${item.title || ''} ${item.description || ''} ${item.content || ''}`
    }));
  });
}

export async function fetchGdelt() {
  return cachedGet('gdelt', async () => {
    const { data } = await axios.get('https://api.gdeltproject.org/api/v2/doc/doc', {
      params: {
        query: middleEastQuery,
        mode: 'ArtList',
        maxrecords: 150,
        format: 'json',
        sort: 'HybridRel'
      }
    });

    return (data.articles || []).map((item) => ({
      provider: 'gdelt',
      title: item.title,
      summary: item.seendate ? `نُشر ضمن موجز GDELT بتاريخ ${item.seendate}` : '',
      url: item.url,
      imageUrl: item.socialimage,
      sourceName: item.domain || 'GDELT',
      publishedAt: item.seendate,
      rawText: `${item.title || ''} ${item.domain || ''}`
    }));
  });
}

export async function fetchFromProviders() {
  const results = await Promise.allSettled([fetchNewsApi(), fetchGNews(), fetchGdelt()]);
  const merged = [];

  for (const result of results) {
    if (result.status === 'fulfilled') merged.push(...result.value);
    else logger.warn({ err: result.reason }, 'Provider failed; fallback providers continue.');
  }

  return merged;
}
