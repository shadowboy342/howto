import crypto from 'crypto';

const categoryRules = [
  { name: 'عاجل', terms: ['عاجل', 'urgent', 'breaking'] },
  { name: 'عسكري', terms: ['جيش', 'military', 'defense', 'missile', 'حرب'] },
  { name: 'اقتصادي', terms: ['economy', 'economic', 'inflation', 'oil', 'نفط', 'اقتصاد'] },
  { name: 'سياسي', terms: ['president', 'minister', 'parliament', 'election', 'سياسي', 'حكومة'] }
];

export function normalizeSummary(text = '') {
  const clean = text.replace(/\s+/g, ' ').trim();
  const words = clean.split(' ').filter(Boolean);
  return words.slice(0, 180).join(' ');
}

export function detectCategory(text = '') {
  const normalized = text.toLowerCase();
  const found = categoryRules.find((rule) => rule.terms.some((term) => normalized.includes(term)));
  return found ? found.name : 'سياسي';
}

export function buildDedupHash({ title, url, publishedAt }) {
  const raw = `${title || ''}|${url || ''}|${new Date(publishedAt).toISOString().slice(0, 13)}`;
  return crypto.createHash('sha256').update(raw).digest('hex');
}

export function isRecent(publishedAt, windowHours) {
  const ts = new Date(publishedAt).getTime();
  if (Number.isNaN(ts)) return false;
  return Date.now() - ts <= windowHours * 60 * 60 * 1000;
}
