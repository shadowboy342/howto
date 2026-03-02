import { useEffect, useState } from 'react';
import { api } from '../api/client';

export function useNews(filters) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await api.get('/news', { params: filters });
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    const id = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [filters.category, filters.country, filters.search]);

  return { news, loading, refresh: fetchNews };
}
