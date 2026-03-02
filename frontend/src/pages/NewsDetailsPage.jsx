import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function NewsDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get('/news', { params: { limit: 500 } }).then(({ data }) => {
      setItem(data.find((n) => n.id === id));
    });
  }, [id]);

  if (!item) return <p>لا يوجد خبر.</p>;

  return (
    <main>
      <h1>{item.title}</h1>
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="detail-image" />}
      <p>{item.summary}</p>
      <p>{new Date(item.publishedAt).toLocaleString('ar-EG')}</p>
      <p>المصدر: {item.sourceName}</p>
      <a href={item.url} target="_blank" rel="noreferrer">فتح المصدر</a>
    </main>
  );
}
