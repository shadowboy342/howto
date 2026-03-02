import { useState } from 'react';
import Filters from '../components/Filters';
import NewsMap from '../components/NewsMap';
import { useNews } from '../hooks/useNews';

export default function HomePage() {
  const [filters, setFilters] = useState({ search: '', category: '', country: '' });
  const { news, loading } = useNews(filters);

  return (
    <main>
      <h1>خريطة أخبار الشرق الأوسط</h1>
      <Filters filters={filters} setFilters={setFilters} />
      {loading ? <p>جاري التحميل...</p> : <NewsMap news={news} />}
    </main>
  );
}
