import { useState } from 'react';
import { api } from '../api/client';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    const { data } = await api.get('/admin/stats', { headers: { 'x-admin-token': token } });
    setStats(data);
  };

  const refresh = async () => {
    await api.post('/news/refresh', {}, { headers: { 'x-admin-token': token } });
    await loadStats();
  };

  return (
    <main>
      <h1>لوحة الإدارة</h1>
      <input type="password" placeholder="Admin Token" value={token} onChange={(e) => setToken(e.target.value)} />
      <button onClick={loadStats}>إحصائيات</button>
      <button onClick={refresh}>تحديث الآن</button>
      {stats && <pre>{JSON.stringify(stats, null, 2)}</pre>}
    </main>
  );
}
